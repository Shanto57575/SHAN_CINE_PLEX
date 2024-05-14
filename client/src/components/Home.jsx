import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logOutUser } from "../app/features/users/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
	const dispatch = useDispatch();

	const handleLogOut = async () => {
		try {
			const user = await axios.post("/api/v1/users/logout");
			dispatch(logOutUser());
			toast.success("Logged Out Successfully!");
			console.log(user);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<button
				onClick={handleLogOut}
				className="bg-black text-white py-2 px-3 rounded m-5"
			>
				LogOut
			</button>
			<Toaster />
			<h1>Home</h1>
		</div>
	);
};

export default Home;
