import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAdminOrEmployee = () => {
	const { isAuthenticated, isAdmin, isEmployee } = useSelector((state) => state.user);
	return isAuthenticated && (isAdmin || isEmployee) ? <Outlet /> : <Navigate to='/' replace />;
};

export default RequireAdminOrEmployee;
