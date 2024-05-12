import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

const Regsiter = () => {
	const [error, setError] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (userData) => {
		try {
			const response = await axios.post("/api/v1/users/register", userData);
			const userInfo = await response.data;
			console.log(userInfo);
			toast.success("Signed Up Successfully!");
			setError("");
			reset();
		} catch (error) {
			setError(error.response.data.message);
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className="flex items-center justify-center bg-gradient-to-r from-purple-300 via-slate-900 to-gray-800 h-screen">
			<div className="w-full max-w-xs">
				<h1 className="text-white text-center mb-2 text-2xl font-bold">
					Sign Up
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="shadow-md bg-slate-950 shadow-white rounded px-8 pt-12 pb-8 mb-4 my-auto"
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
					<div className="mb-6">
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
							type="password"
							placeholder="******************"
						/>
						{errors.password && (
							<span className="text-rose-600 my-1.5">
								{errors.password.message}
							</span>
						)}
					</div>
					<section className="text-center">
						<input
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
		</div>
	);
};

export default Regsiter;
