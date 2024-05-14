import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {
	loginStart,
	loginSuccess,
	loginFailed,
} from "../app/features/users/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	console.log(location.pathname);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (userData) => {
		try {
			dispatch(loginStart());
			const response = await axios.post("/api/v1/users/login", userData);
			const userInfo = await response.data;
			console.log(userInfo);
			dispatch(loginSuccess(userInfo.user));
			toast.success("Signed In Successfully!");
			setError("");
			reset();
			navigate(`/profile`);
		} catch (error) {
			const errorMessage = error.response.data.message || "Login Failed";
			setError(errorMessage);
			toast.error(errorMessage);
			dispatch(loginFailed({ error: errorMessage }));
		}
	};

	return (
		<div className="flex items-center justify-center bg-gradient-to-r from-purple-300 via-slate-900 to-gray-800 h-screen">
			<div className="w-full max-w-xs">
				<h1 className="text-white text-center mb-4 text-3xl font-bold">
					Sign In
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-slate-950 rounded px-10 pb-8 pt-12 mb-4 my-auto hover:border-2 border-purple-200 shadow-lg shadow-gray-500"
				>
					<div className="mb-4">
						<label
							className="block text-gray-50 text-sm font-bold mb-2"
							htmlFor="username"
						>
							*Email
						</label>
						<input
							{...register("email", { required: true })}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Email"
						/>
						{errors.email && (
							<span className="text-red-600 my-1.5">Email is required</span>
						)}
					</div>
					<div className="relative mb-6">
						<label
							className="block text-gray-50 text-sm font-bold mb-2"
							htmlFor="password"
						>
							*Password
						</label>
						<input
							{...register("password", { required: true })}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
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
						{errors.password && (
							<span className="text-red-600 my-1.5">password is required</span>
						)}
					</div>
					<section className="text-center">
						<input
							type="submit"
							className="bg-gray-900 cursor-pointer text-white hover:bg-slate-700 duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						/>
						<p className="text-sm text-white mt-2">
							Dont have an account ?
							<Link
								className="text-purple-500 hover:text-blue-500 ml-2 underline"
								to="/register"
							>
								Sign Up
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
				<p className="text-center text-xs text-white">
					©{new Date().getFullYear()} sh@nto Corp. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Login;
