import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireGuest = () => {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	return !isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
};

export default RequireGuest;
