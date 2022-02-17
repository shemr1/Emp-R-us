import React from "react";
import Link from "next/link";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/router";

import cookie from "js-cookie";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import axios from "axios";

const Login = ({ providers }) => {
	const { data: session, status } = useSession();
	const loading = status === "loading";
	const contentType = "application/json";
	const router = useRouter();
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	console.log({ session, providers, loading });
	if (status === "authenticated") {
		router.push("/");
	}

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};

	const formValidate = () => {
		let err = {};

		if (!form.email) err.email = "Email is required";
		if (!form.password) err.password = "Password is required";

		return err;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = formValidate();
		if (Object.keys(errs).length === 0) {
			login(form);
		} else {
			setErrors({ errs });
		}
	};

	const login = async (form) => {
		const { email, password } = form;
		try {
			signIn("credentials", { email, password });
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<>
			{status === "unauthenticated" && (
				<>
					<div>
						<div
							className="d-flex justify-content-center align-items-center"
							style={{ minHeight: "auto" }}
						>
							<div
								style={{ maxWidth: "450px", width: "100%" }}
								className="border border-1 max-auto p-4 shadow bg-white"
							>
								<h2
									className="text-center fw-bolder text-uppercase"
									style={{ color: "#555", letterSpacing: "1px" }}
								>
									Employees R'Us
								</h2>

								<p className="text-center">Social</p>

								<button
									onClick={() => signIn("google")}
									className="btn w-100 my-2 py-3"
									style={{ backgroundColor: "#dc3545", color: "#fff" }}
								>
									Sign in with Google
								</button>
								<button
									onClick={() => signIn("github")}
									className="btn w-100 my-2 py-3"
									style={{ backgroundColor: "#212529", color: "#fff" }}
								>
									Sign in with Github
								</button>
							</div>
						</div>
						<div
							className="d-flex justify-content-center align-items-center"
							style={{ minHeight: "auto" }}
						>
							<h3>Or</h3>
						</div>
						<div
							className="d-flex justify-content-center align-items-center"
							style={{ minHeight: "auto" }}
						>
							<div>
								<form onSubmit={handleSubmit}>
									<input
										className="form-control"
										placeholder="Email"
										type="email"
										name="email"
										onChange={handleChange}
									/>
									<br />
									<input
										className="form-control"
										placeholder="Password"
										type="password"
										name="password"
										onChange={handleChange}
									/>
									<br />
									<div className="row justify-content-around">
										<div className="col-2">
											<button type="submit" className="btn btn-dark">
												Login
											</button>
										</div>
									</div>
								</form>
								<div className="col-6">
									<Link href="/Register">
										<button className="btn btn-dark">Register</button>
									</Link>
								</div>
								<div>
									{Object.keys(errors).map((err, index) => (
										<li key={index}>{err.toString}</li>
									))}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

Login.getInitialProps = async (context) => {
	return {
		providers: await getProviders(context),
	};
};

export default Login;
