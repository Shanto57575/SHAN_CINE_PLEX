import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
	const userInfo = useSelector((state) => state.user.userInfo);

	return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
