import calendarApi from "../../src/api/calendarApi";

// eslint-disable-next-line no-undef
describe('Pruebas en el CalendarApi', () => {

    // eslint-disable-next-line no-undef
    test('debe de tener la configuración por defecto', () => {
        //console.log(calendarApi);
        // eslint-disable-next-line no-undef
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
        // eslint-disable-next-line no-undef
        console.log(process.env.VITE_API_URL);
    });

    // eslint-disable-next-line no-undef
    test('debe de tener el x-token en el header de todas las peticiones', async () => {
        const token = 'ABC-123-XYZ';
        localStorage.setItem('token', token);
        const res = await calendarApi.get('/auth');
        //console.log(res);
        // eslint-disable-next-line no-undef
        expect(res.config.headers['x-token']).toBe(token);

    });

})

