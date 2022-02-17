import Form from "../components/EmployeeInput";

const NewEmp = () => {
	const EmpForm = {
		name: "",
		title: "",
		department: "",
		age: 0,
		Contracted: false,
		image_url: "",
	};

	return <Form formId="add-emp-form" petForm={EmpForm} />;
};

export default NewEmp;
