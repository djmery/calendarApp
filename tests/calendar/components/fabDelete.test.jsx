import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

// eslint-disable-next-line no-undef
jest.mock('../../../src/hooks/useCalendarStore');

// eslint-disable-next-line no-undef
describe('Pruebas en fabDelete', () => {

    // eslint-disable-next-line no-undef
    const mockStartDeletingEvent = jest.fn();

    // eslint-disable-next-line no-undef
    beforeEach(() => jest.clearAllMocks());

    // eslint-disable-next-line no-undef
    test('debe de mostrar el componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });
        render(<FabDelete />);
        const btn = screen.getByLabelText('btn-delete');
        console.log(btn.classList.toString());
        // eslint-disable-next-line no-undef
        expect(btn.classList).toContain('btn');
        // eslint-disable-next-line no-undef
        expect(btn.classList).toContain('btn-danger');
        // eslint-disable-next-line no-undef
        expect(btn.classList).toContain('fab-danger');
        // eslint-disable-next-line no-undef
        expect(btn.style.display).toBe('none');

    });

    // eslint-disable-next-line no-undef
    test('debe de mostrar el botón si hay un evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });
        render(<FabDelete />);
        const btn = screen.getByLabelText('btn-delete');

        // eslint-disable-next-line no-undef
        expect(btn.style.display).toBe('');

    });

    // eslint-disable-next-line no-undef
    test('debe de llamar startDeletingEvent si hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });
        render(<FabDelete />);
        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click(btn);

        // eslint-disable-next-line no-undef
        expect(mockStartDeletingEvent).toHaveBeenCalled();

    });


})