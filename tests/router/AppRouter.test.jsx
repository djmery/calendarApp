import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

// eslint-disable-next-line no-undef
jest.mock('../../src/hooks/useAuthStore');
// eslint-disable-next-line no-undef
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));
//cuando el appRouter intente renderizar el calendarPage el mock entra y en lugar de renderizar todo el componente
//del calendario rendereiza este h1

// eslint-disable-next-line no-undef
describe('Pruebas en <AppRouter />', () => {

    // eslint-disable-next-line no-undef
    const mockCheckAuthToken = jest.fn();

    // eslint-disable-next-line no-undef
    beforeEach(() => jest.clearAllMocks());

    // eslint-disable-next-line no-undef
    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });
        render(<AppRouter />);
        // eslint-disable-next-line no-undef
        expect(screen.getByText('Cargando...')).toBeTruthy();
        // eslint-disable-next-line no-undef
        expect(mockCheckAuthToken).toHaveBeenCalled();
    });

    // eslint-disable-next-line no-undef
    test('debe de mostrar el login en caso de no estar autenticado', () => {
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });
        // eslint-disable-next-line no-unused-vars
        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );
        // eslint-disable-next-line no-undef
        expect(screen.getByText('Ingreso')).toBeTruthy();
        // eslint-disable-next-line no-undef
        expect(container).toMatchSnapshot();
    });

    // eslint-disable-next-line no-undef
    test('debe de mostrar el calendario si estamos autenticados', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });
        // eslint-disable-next-line no-unused-vars
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );
        // eslint-disable-next-line no-undef
        expect(screen.getByText('CalendarPage')).toBeTruthy();

    });



})