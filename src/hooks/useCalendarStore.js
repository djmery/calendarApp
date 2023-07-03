import { useDispatch, useSelector } from "react-redux";
import { onDeleteEvent, onSetActiveEvent, onUpdateEvent, ondAddNewEvent } from "../store";


export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        //Todo: llegar al backend

        //Todo bien
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            //Creando  
            dispatch(ondAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }

    }

    const startDeletingEvent = () => {
        // Todo: Llegar al backend
        dispatch(onDeleteEvent());
    }

    return {
        //*Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //*Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}
