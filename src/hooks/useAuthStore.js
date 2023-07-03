import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";


export const useAuthStore = () => {

    const { user, status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));



        } catch (error) {
            console.log({ error });
            dispatch(onLogout("Credenciales Incorrectas"));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());
        try {

            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));


        } catch (error) {
            console.log({ error });
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/renew');
            console.log({ data });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }

    }

    return {
        //*Propiedades
        errorMessage,
        status,
        user,
        //*Métodos
        startLogin,
        startRegister,
        checkAuthToken
    }
}