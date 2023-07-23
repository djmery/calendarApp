import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

// eslint-disable-next-line no-undef
describe('Pruebas en uiSlice', () => {

    // eslint-disable-next-line no-undef
    test('debe de regresar el estado por defecto', () => {
        console.log(uiSlice.getInitialState());
        // eslint-disable-next-line no-undef
        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
        // eslint-disable-next-line no-undef 
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
        //se puede hacer también de esta forma
    });

    // eslint-disable-next-line no-undef
    test('debe de cambiar isDateModalOpen correctamente', () => {
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());
        console.log(state);
        // eslint-disable-next-line no-undef
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer(state, onCloseDateModal());
        // eslint-disable-next-line no-undef
        expect(state.isDateModalOpen).toBeFalsy();

    });

})
