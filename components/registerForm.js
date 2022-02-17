import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const form = ({ formId }) => {
	const router = useRouter();
	const contentType = "application/json";
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState("");

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		image: "",
	});

	const register = async (form) => {
		try {
			await fetch("/api/users/register", {
				method: "POST",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(form),
			});
			router.push("/");
		} catch (error) {
			setMessage("Failed to add user");
		}
	};

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		form.image = "";
		const errs = formValidate();
		if (Object.keys(errs).length === 0) {
			register(form);
		} else {
			setErrors({ errs });
		}
	};

	const formValidate = () => {
		let err = {};
		if (!form.name) err.name = "Name is required";
		if (!form.email) err.email = "Email is required";
		if (!form.password) err.password = "Password is required";

		return err;
	};

	return (
		<>
			<div
				className="card d-flex justify-content-center align-items-center mx-auto"
				style={{ width: "30%" }}
			>
				<h4 className="card-title">Register</h4>
				<div className="card-body">
					<form id={formId} onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								placeholder="Full Name"
								className="form-control"
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								placeholder="Email Address"
								className="form-control"
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								placeholder="Password"
								className="form-control"
								minLength="10"
								//pattern="[a-z]{0,9}"
								title="Password should be digits (0 to 9) or alphabets (a to z)."
								onChange={handleChange}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary my-1">
							Submit
						</button>
					</form>
					<p>{message}</p>
					<div>
						{Object.keys(errors).map((err, index) => (
							<li key={index}>{err.toString}</li>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default form;
