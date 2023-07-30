import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks/useUiStore";
import { Provider } from "react-redux";
import { uiSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = (initialState) => {
    return configureStore({
        //creamos el store, es una función que mando a llamar para crear el store
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

// eslint-disable-next-line no-undef
describe('Pruebas en useUiStore', () => {

    // eslint-disable-next-line no-undef
    test('debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            //react redux tiene que estar envuelto en un provider
            //el wrapper es el envoltorio se dispara con una función que debe regresar un jsx, el store es donde el hook va a coger la información
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        // eslint-disable-next-line no-undef
        expect(result.current).toEqual({
            isDateModalOpen: false,
            // eslint-disable-next-line no-undef
            openDateModal: expect.any(Function),
            // eslint-disable-next-line no-undef
            closeDateModal: expect.any(Function),
            // eslint-disable-next-line no-undef
            toggleDateModal: expect.any(Function)
        });

    });

    // eslint-disable-next-line no-undef
    test('openDateModal debe de colocar true en el isDateModalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { openDateModal } = result.current;

        act(() => {
            openDateModal();
        });

        // eslint-disable-next-line no-undef
        expect(result.current.isDateModalOpen).toBeTruthy();

    });

    // eslint-disable-next-line no-undef
    test('closeDateModal debe de colocar false en isDateModalOpen ', () => {

        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { closeDateModal } = result.current;
        act(() => {
            closeDateModal();
        });

        // eslint-disable-next-line no-undef
        expect(result.current.isDateModalOpen).toBeFalsy();
    });

    // eslint-disable-next-line no-undef
    test('toggleDateModal debe de cambiar el estado en isDateModalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { toggleDateModal } = result.current;
        act(() => {
            toggleDateModal();
        });
        // eslint-disable-next-line no-undef
        expect(result.current.isDateModalOpen).toBeFalsy();

        act(() => {
            toggleDateModal();
        });
        // eslint-disable-next-line no-undef
        expect(result.current.isDateModalOpen).toBeFalsy();
    });
});