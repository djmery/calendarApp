import { Navigate, Route, Routes } from "react-router-dom";
import { CalendarPage } from "../pages/CalendarPage";



export const CalendarRoutes = () => {

    // const status = 'not-authenticated';

    // if (status === 'not-authenticated') {
    //     return <Navigate to={'/auth/login'} />
    // }
    return (
        <Routes>
            <Route path="/" element={<CalendarPage />} />
        </Routes>
    )
}

