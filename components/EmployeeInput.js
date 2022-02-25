import { useState } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Form = ({ formId }) => {
	const router = useRouter();
	const { data: session } = useSession();
	console.log(session);

	const contentType = "application/json";
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState("");
	const [url, setUrl] = useState("");

	const [form, setForm] = useState({
		name: "",
		title: "",
		age: 0,
		department: "",
		Contracted: false,
		image_url: undefined,
		user: "",
	});

	const postData = async (form) => {
		try {
			await fetch("/api/employee", {
				method: "POST",
				headers: {
					Accept: contentType,
					"Content-Type": contentType,
				},
				body: JSON.stringify(form),
			});
			router.push("/");
		} catch (error) {
			setMessage("Failed to add employee");
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

	const handleImage = async (e) => {
		const formim = e.currentTarget;

		const fileInput = Array.from(formim.elements).find(
			({ name }) => name === "image_url",
		);
		// console.log(fileInput.files);
		const formImgData = new FormData();
		for (const file of fileInput.files) {
			formImgData.append("file", file);
		}
		// console.log(formImgData);
		formImgData.append("upload_preset", "uploads");

		const data = await fetch(
			"https://api.cloudinary.com/v1_1/dbznqitvf/image/upload",
			// process.env.CLOUDINARY_URL,
			{
				method: "POST",
				body: formImgData,
			},
		).then((r) => r.json());
		console.log(data, data.secure_url, data.url);
		form.image_url = data.secure_url;
		console.log(form.image_url);

		// return data.secure_url;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		form.user = session.userId;
		form.session = session;
		form.Contracted === "on"
			? (form.Contracted = true)
			: (form.Contracted = false);
		console.log(form.Contracted);
		await handleImage(e);
		console.log(form.image_url);

		postData(form);
	};

	const formValidate = () => {
		let err = {};
		if (!form.name) err.name = "Name is required";
		if (!form.title) err.title = "Title is required";
		if (!form.department) err.department = "Department is required";
		if (!form.Contracted) err.Contracted = "Contracted is required";
		return err;
	};

	return (
		<>
			<div className="container">
				<form id={formId} onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							// maxLength="20"
							name="name"
							value={form.name}
							onChange={handleChange}
							required
							placeholder="Enter Full Name"
							className="form-control"
						/>

						<small id="emailHelp" className="form-text text-muted">
							We'll never share your email with anyone else.
						</small>
						<br />
					</div>
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							maxLength="50"
							name="title"
							value={form.title}
							onChange={handleChange}
							required
							className="form-control"
						/>
						<br />
					</div>
					<div>
						<label htmlFor="department">Department</label>
						<input
							multiple
							type="text"
							maxLength="30"
							name="department"
							value={form.department}
							onChange={handleChange}
							required
							className="form-control"
						/>
						<br />
					</div>
					<div>
						<label htmlFor="age">Age</label>
						<input
							type="number"
							name="age"
							value={form.age}
							onChange={handleChange}
							className="form-control"
						/>
						<br />
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="Image">
							Image
						</label>
						<input
							type="file"
							name="image_url"
							value={form.image_url}
							onChange={handleChange}
							className="form-control"
						/>
						<br />
					</div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="Contracted">
							Contracted
						</label>
						<input
							type="checkbox"
							name="Contracted"
							checked={form.Contracted}
							onChange={handleChange}
							className="form-check-input"
						/>
						<br />
					</div>

					<button type="submit" className="btn btn-primary my-1">
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default Form;
