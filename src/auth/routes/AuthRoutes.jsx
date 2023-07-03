import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { useAuthStore } from "../../hooks";


export const AuthRoutes = () => {
    const { status } = useAuthStore();


    // if (status === 'checking') {
    //     return (
    //         <h1>Cargando...</h1>
    //     )
    // }
    //const status = 'authenticated';
    if (status === 'authenticated') {
        return <Navigate to={'/'} />
    }
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
        </Routes>
    )
}
