import { parseISO } from "date-fns"

export const convertEventsToDateEvents = (events = []) => {
    //regresa los eventos cuyas fechas van a estar como tipo date
    return events.map(event => {
        //para convertir el string de los campos fecha a una fecha
        event.start = parseISO(event.start);
        event.end = parseISO(event.end);

        return event;
    })
}