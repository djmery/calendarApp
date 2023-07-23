import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

// eslint-disable-next-line no-undef
describe('Pruebas en authSlice', () => {

    // eslint-disable-next-line no-undef
    test('debe de regresar el estado inicial', () => {
        // eslint-disable-next-line no-undef
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    // eslint-disable-next-line no-undef
    test('debe de realizar un login', () => {
        // eslint-disable-next-line no-unused-vars
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        //console.log(state);
        // eslint-disable-next-line no-undef
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });
    });

    // eslint-disable-next-line no-undef
    test('debe de realizar un logout', () => {
        // eslint-disable-next-line no-unused-vars
        const state = authSlice.reducer(authenticatedState, onLogout());
        // eslint-disable-next-line no-undef
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    // eslint-disable-next-line no-undef
    test('debe de realizar un logout con error', () => {
        // eslint-disable-next-line no-unused-vars
        const errorMessage = 'Credenciales Incorrectas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        // eslint-disable-next-line no-undef
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });

    // eslint-disable-next-line no-undef
    test('debe de limpiar el mensaje de error', () => {
        const errorMessage = 'Credenciales Incorrectas'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = authSlice.reducer(state, clearErrorMessage());
        // eslint-disable-next-line no-undef
        expect(newState.errorMessage).toBe(undefined);
    });

    // eslint-disable-next-line no-undef
    test('debe de tener el estado onChecking', () => {
        const state = authSlice.reducer(authenticatedState, onChecking());
        // eslint-disable-next-line no-undef
        expect(state).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined
        });
    });

})