import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {
	updateStart,
	updateSuccess,
	updateFailed,
} from "../app/features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const { userInfo, loading } = useSelector((state) => state.user);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const { handleSubmit, register } = useForm();

	const onSubmit = async (userData) => {
		console.log(userData);
		try {
			dispatch(updateStart());
			const response = await axios.put("/api/v1/users/profile", userData);
			const userInfo = await response.data;
			console.log("userInfo-->", userInfo);
			toast.success("userData Updated Successfully!");
			dispatch(updateSuccess(userInfo.user));
			setError("");
		} catch (error) {
			const errorMessage = error.response.data.message || "Registration Failed";
			setError(errorMessage);
			toast.error(errorMessage);
			dispatch(updateFailed({ error: errorMessage }));
		}
	};

	return (
		<div className="flex items-center justify-center bg-gradient-to-r from-purple-300 via-slate-900 to-gray-800 h-screen">
			<div className="w-full max-w-xs">
				<h1 className="text-white text-center mb-2 text-2xl font-bold">
					My Profile
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="shadow-md bg-slate-950 shadow-white rounded-s-lg px-8 pt-12 pb-8 mb-4 my-auto"
				>
					<div className="mb-4">
						<label
							className="block text-gray-50 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							defaultValue={userInfo?.username}
							{...register("username")}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-50 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							defaultValue={userInfo?.email}
							{...register("email")}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Email"
						/>
					</div>
					<div className="relative mb-6">
						<label
							className="block text-gray-50 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							{...register("password")}
							type={showPassword ? "text" : "password"}
							placeholder="*********"
						/>
						{showPassword ? (
							<IoIosEye
								onClick={togglePassword}
								className="absolute top-0.5 right-2 mt-8 text-gray-700 cursor-pointer"
								size="25"
							/>
						) : (
							<IoIosEyeOff
								onClick={togglePassword}
								className="absolute top-0.5 right-2 mt-8 text-gray-700 cursor-pointer"
								size="25"
							/>
						)}
					</div>
					<section className="text-center">
						<input
							disabled={loading}
							type="submit"
							className="bg-gray-900 cursor-pointer text-white hover:bg-slate-700 duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						/>
						<p className="text-sm text-white mt-2">
							Already have an account ?
							<Link
								className="text-purple-500 hover:text-blue-500 ml-2 underline"
								to="/login"
							>
								Sign In
							</Link>
						</p>
					</section>
					<Toaster />
					{error && (
						<div className="text-center mt-4">
							<span className="bg-rose-600 text-white px-3 py-2 rounded">
								{error}
							</span>
						</div>
					)}
				</form>
				<p className="text-center text-xs font-thin text-white">
					©{new Date().getFullYear()} sh@nto Corp. All rights reserved.
				</p>
			</div>
			{/* <img
				className="h-[410px] w-1/2 mt-2 rounded-e-lg shadow-white"
				src="https://media.istockphoto.com/id/1478374846/photo/grandfather-and-granddaughter-having-fun-at-movies.jpg?s=612x612&w=0&k=20&c=Dz9KJ8mVkWfXd3WSaBhyJ8jJA56_zGOr8t05r2xccGs="
				alt=""
			/> */}
		</div>
	);
};

export default Profile;
