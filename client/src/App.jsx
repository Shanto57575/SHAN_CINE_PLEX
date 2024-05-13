import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./Pages/Login";
import Regsiter from "./Pages/Regsiter";
import Profile from "./Pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Regsiter />} />
				<Route path="/login" element={<Login />} />
				<Route path="" element={<PrivateRoute />}>
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
