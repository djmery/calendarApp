import { calendarSlice, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent, ondAddNewEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState";

// eslint-disable-next-line no-undef
describe('Pruebas en CalendarSlice', () => {

    // eslint-disable-next-line no-undef
    test('debe de regresar el estado inicial', () => {

        const state = calendarSlice.getInitialState();
        // eslint-disable-next-line no-undef
        expect(state).toEqual(initialState)

    });

    // eslint-disable-next-line no-undef
    test('onSetActiveEvent debe de activar el evento', () => {
        // eslint-disable-next-line no-unused-vars
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        // eslint-disable-next-line no-undef
        expect(state.activeEvent).toEqual(events[0]);
    });

    // eslint-disable-next-line no-undef
    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: '3',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Cumpleaños de David',
            notes: 'Alguna nota para David',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, ondAddNewEvent(newEvent));
        // eslint-disable-next-line no-undef
        expect(state.events).toEqual([...events, newEvent]);

    });

    // eslint-disable-next-line no-undef
    test('onUpdateEvent debe de actualizar el evento', () => {
        const updatedEvent = {
            id: '1',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Cumpleaños de Fernando actualizado',
            notes: 'Alguna nota actualizada',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        // eslint-disable-next-line no-undef
        expect(state.events).toContain(updatedEvent);
    });

    // eslint-disable-next-line no-undef
    test('onDeleteEvent debe de borrar el evento activo', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
        // eslint-disable-next-line no-undef
        expect(state.activeEvent).toBe(null);
        // eslint-disable-next-line no-undef
        expect(state.events).not.toContain(events[0]);
    });

    // eslint-disable-next-line no-undef
    test('onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        // eslint-disable-next-line no-undef
        expect(state.isLoadingEvents).toBeFalsy();
        // eslint-disable-next-line no-undef
        expect(state.events).toEqual(events);

        // const newState = calendarSlice.reducer(initialState, onLoadEvents(events));
        // expect(state.events.length).toBe(events.length)

    });

    // eslint-disable-next-line no-undef
    test('onLogoutCalendar debe de limpiar el estado', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
        // eslint-disable-next-line no-undef
        expect(state).toEqual(initialState);
    });


})