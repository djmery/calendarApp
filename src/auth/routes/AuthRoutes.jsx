import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";



export const AuthRoutes = () => {

    const status = 'authenticated';

    if (status === 'authenticated') {
        return <Navigate to={'/'} />
    }
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
        </Routes>
    )
}
