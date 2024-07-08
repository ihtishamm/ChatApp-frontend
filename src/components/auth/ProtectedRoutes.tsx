import { Navigate, Outlet } from "react-router-dom"

type ProtectedRoutesProps = {
    children: React.ReactNode;
    user: any;
    redirect?: string;
};

const ProtectedRoutes = ({ children, user, redirect = "/login" }: ProtectedRoutesProps) => {
    if (!user) {
        return <Navigate to={redirect} replace />;
    }
    return children ? children: <Outlet/>;
};

export default ProtectedRoutes;
