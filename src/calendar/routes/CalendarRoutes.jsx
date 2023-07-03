import { Navigate, Route, Routes } from "react-router-dom";
import { CalendarPage } from "../pages/CalendarPage";
import { useAuthStore } from "../../hooks";


export const CalendarRoutes = () => {
    const { status } = useAuthStore();
    //const status = 'not-authenticated';

    if (status === 'not-authenticated') {
        return <Navigate to={'/auth/login'} />
    }
    return (
        <Routes>
            <Route path="/" element={<CalendarPage />} />
        </Routes>
    )
}

