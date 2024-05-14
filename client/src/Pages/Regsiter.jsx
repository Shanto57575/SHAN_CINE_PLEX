import React, { useState } from "react";
import {  useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {
	registrationStart,
	registrationSuccess,
	registrationFailed,
} from "../app/features/users/userSlice";
import cinema from "../assets/cinema.png";
import { useDispatch, useSelector } from "react-redux";

const Regsiter = () => {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.user);

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
			dispatch(registrationStart());
			const response = await axios.post("/api/v1/users/register", userData);
			const userInfo = await response.data;
			console.log(userInfo);
			toast.success("Signed Up Successfully!");
			dispatch(registrationSuccess(userInfo.user));
			setError("");
			reset();
			navigate("/login");
		} catch (error) {
			const errorMessage = error.response.data.message || "Registration Failed";
			setError(errorMessage);
			toast.error(errorMessage);
			dispatch(registrationFailed({ error: errorMessage }));
		}
	};

	return (
		<div className="flex items-center justify-center bg-gradient-to-r from-purple-300 via-slate-700 to-gray-800 h-screen">
			<div className="w-full max-w-xs">
				<h1 className="text-white text-center mb-2 text-2xl font-bold">
					Sign Up
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
							*Username
						</label>
						<input
							{...register("username", {
								required: "Username is required",
								maxLength: {
									value: 20,
									message: "Username should not exceed 20 characters",
								},
							})}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
						/>
						{errors.username && (
							<span className="text-rose-600 my-1.5">
								{errors.username.message}
							</span>
						)}
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-50 text-sm font-bold mb-2"
							htmlFor="email"
						>
							*Email
						</label>
						<input
							{...register("email", {
								pattern: {
									value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
									message: "Invalid email address",
								},
								required: "Email is required",
							})}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Email"
						/>
						{errors.email && (
							<span className="text-rose-600 my-1.5">
								{errors.email.message}
							</span>
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
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password should be at least 6 characters long",
								},
								maxLength: {
									value: 15,
									message: "Password should not exceed 15 characters",
								},
								pattern: {
									value:
										/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{6,15}$/,
									message:
										"Password should contain:\n at least one uppercase letter\n, one lowercase letter\n, one number\n, one special character\n, and no spaces",
								},
							})}
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
							<span className="text-rose-600 my-1.5">
								{errors.password.message}
							</span>
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

export default Regsiter;
