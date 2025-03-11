import { Navigate, Outlet } from "react-router-dom";
import { useGenericContext } from "./hooks/useGenericContext";
import { authContext } from "./context/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

interface ProtectedRouteProps {
    redirectTo: string;
    requireAuth: boolean;
}

const ProtectedRoute = ({ redirectTo, requireAuth }: ProtectedRouteProps) => {
    const { idSession, loadingSession } = useGenericContext(authContext);

    if (loadingSession) return <LoadingSpinner/>;

    if (requireAuth && !idSession) return <Navigate to={redirectTo} replace />;
    if (!requireAuth && idSession) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default ProtectedRoute;