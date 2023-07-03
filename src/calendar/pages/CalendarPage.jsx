import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';
import set from 'date-fns/esm/set';



export const CalendarPage = () => {

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week');
    const { openDateModal, closeDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        openDateModal();
    }
    const onSelect = (event) => {
        //console.log({ click: event });
        setActiveEvent(event);
    }
    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        //console.log({ viewChanged: event });
    }

    return (
        <div className='calendar-container'>
            <Navbar />
            <Calendar
                //cambiar el idioma del calendario
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                // style={{ height: 'calc(100vh-80px)' }}
                messages={getMessagesES()}
                //eventPropGetter - para coger toda la información de mis eventos
                eventPropGetter={eventStyleGetter}
                components={{
                    //tenemos todos los posibles componentes o eventos que son necesarios y podems sobrescribir
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </div>


    )
}
