import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAdmin = () => {
	const { isAuthenticated, isAdmin } = useSelector((state) => state.user);
	return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to='/' replace />;
};

export default RequireAdmin;
