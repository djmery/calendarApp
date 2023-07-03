
import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

//TODO: configurar interceptores
// Los interceptores nos permite interceptar las peticiones. Ocupamos un interceptor a la hora de hacer un request
//cualquier petición que haga con el api le coloque este header.
calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers, //por si vienen mas headers.
        'x-token': localStorage.getItem('token')
    }

    return config;
});




export default calendarApi;