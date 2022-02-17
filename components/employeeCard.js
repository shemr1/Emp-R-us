import React, { Component } from "react";

const EmpCard = ({ employee }) => {
	const handleEmployeeClick = (e) => {
		console.log(e);
	};

	return (
		<div
			className="card"
			style={{ width: "18rem" }}
			onClick={() => handleEmployeeClick(employee._id)}
		>
			<div className="card-body">
				<div className="avatar">
					<img src={employee.image_url} className="card-img-top" alt="" />
				</div>

				<h5 className="card-title ">{employee.name.toUpperCase()}</h5>
				<p className="card-text">{employee.title}</p>
			</div>
		</div>
	);
};

export default EmpCard;
