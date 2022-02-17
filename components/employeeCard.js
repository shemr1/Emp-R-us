import styles from "../styles/Local.module.css";

const EmpCard = ({ employee }) => {
	return (
		<div className="card" style={{ width: "18rem" }}>
			<img src={employee.image_url} className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">{employee.name}</h5>
				<p className="card-text">{employee.title}</p>
				<a href="#" className="btn btn-primary">
					Go somewhere
				</a>
			</div>
		</div>
	);
};

export default EmpCard;
