import { Navigate, RouterProvider, Routes, Route, createBrowserRouter } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
// import { AuthRoutes } from "../auth/routes/AuthRoutes";
// import { CalendarRoutes } from "../calendar/routes/CalendarRoutes";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";



// const routesConfig = createBrowserRouter([
//     {
//         path: '/auth/*',
//         element: <AuthRoutes />
//     },
//     {
//         path: '/*',
//         element: <CalendarRoutes />
//     },
//     {
//         path: '/*',
//         element: <Navigate to='/auth/login' />
//     }
// ]);

export const AppRouter = () => {
    //const authStatus = 'not-authenticated';
    const { status, checkAuthToken } = useAuthStore();


    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        //forma del profesor
        <Routes>
            {
                (status === 'not-authenticated')
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />

            }
            <Route path="/*" element={<Navigate to={'/auth/login'} />} />
        </Routes>
        //< RouterProvider router={routesConfig} />


    )

}
