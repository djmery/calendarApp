import { act, renderHook, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";

const getMockStore = (initialState) => {
    return configureStore({
        //creamos el store, es una función que mando a llamar para crear el store
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    });
}

// eslint-disable-next-line no-undef
describe('Pruebas en useAuthStore', () => {

    // eslint-disable-next-line no-undef
    beforeEach(() => localStorage.clear());

    // eslint-disable-next-line no-undef
    test('debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            //react redux tiene que estar envuelto en un provider
            //el wrapper es el envoltorio se dispara con una función que debe regresar un jsx, el store es donde el hook va a coger la información
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        // eslint-disable-next-line no-undef
        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            // eslint-disable-next-line no-undef
            startLogin: expect.any(Function),
            // eslint-disable-next-line no-undef
            startRegister: expect.any(Function),
            // eslint-disable-next-line no-undef
            checkAuthToken: expect.any(Function),
            // eslint-disable-next-line no-undef
            startLogout: expect.any(Function)
        });
    });

    // eslint-disable-next-line no-undef
    test('startLogin debe de realizar el login correctamente', async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            //react redux tiene que estar envuelto en un provider
            //el wrapper es el envoltorio se dispara con una función que debe regresar un jsx, el store es donde el hook va a coger la información
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        const { startLogin } = result.current;

        await act(async () => {
            await startLogin(testUserCredentials);
        });

        const { errorMessage, user, status } = result.current;
        // eslint-disable-next-line no-undef
        expect({ errorMessage, user, status }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '64b5877db1d287a5f0137141' }
        });
        // eslint-disable-next-line no-undef
        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        // eslint-disable-next-line no-undef
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
    });

    // eslint-disable-next-line no-undef
    test('startLogin debe de fallar la autenticación', async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        const { startLogin } = result.current;

        await act(async () => {
            await startLogin({ email: 'prueba@google.com', password: '12ab23' });
        });
        const { errorMessage, user, status } = result.current;
        // eslint-disable-next-line no-undef
        expect(localStorage.getItem('token')).toBe(null);
        // eslint-disable-next-line no-undef
        expect({ errorMessage, user, status }).toEqual({
            errorMessage: 'Credenciales Incorrectas',
            user: {},
            status: 'not-authenticated'
        });

        await waitFor(
            // eslint-disable-next-line no-undef 
            () => expect(result.current.errorMessage).toBe(undefined) //espera a que vuelva a ser undefined
        )
    });

    // eslint-disable-next-line no-undef
    test('startRegister debe de crear un usuario', async () => {

        const newUser = { email: 'prueba@google.com', password: '12ab23ddd', name: 'Test User 2' }

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startRegister } = result.current;
        //quiero evitar que la petición post se haga, ya que crea los usuarios del test en mongo, para ello creamos un spía - spy solo al post
        //con el mockReturnValue regreso cualquier objeto que necesite
        // eslint-disable-next-line no-unused-vars, no-undef
        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: "64b5877db1d287a5f0137141",
                name: "Test User",
                token: "ALGUN-TOKEN"
            }
        });
        await act(async () => {
            await startRegister(newUser);
        });

        const { errorMessage, status, user } = result.current;
        // eslint-disable-next-line no-undef
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '64b5877db1d287a5f0137141' }
        });
        //esto destruye el espía
        spy.mockRestore();
    });

    // eslint-disable-next-line no-undef
    test('startRegister debe de fallar la creación', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startRegister } = result.current;

        await act(async () => {
            await startRegister(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;
        // eslint-disable-next-line no-undef
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Un usuario existe con ese correo',
            status: 'not-authenticated',
            user: {}
        });
    });

    // eslint-disable-next-line no-undef
    test('checkAuthToken debe de fallar si no hay token', async () => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { checkAuthToken } = result.current;

        await act(async () => {
            await checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        // eslint-disable-next-line no-undef
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });
    });

    // eslint-disable-next-line no-undef
    test('checkAuthToken debe de autenticar si hay un token', async () => {

        const { data } = await calendarApi.post('/auth', testUserCredentials)
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { checkAuthToken } = result.current;

        await act(async () => {
            await checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        // eslint-disable-next-line no-undef
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '64b5877db1d287a5f0137141' }
        });
    });

})