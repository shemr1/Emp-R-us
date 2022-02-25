import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Router from "next/router";

const EmpCard = ({ employee }) => {
	const useStyles = makeStyles((theme) => ({
		modal: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		paper: {
			position: "absolute",
			width: 450,
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	}));

	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		console.log("modal closed");
	};

	function rand() {
		return Math.round(Math.random() * 20) - 10;
	}

	function getModalStyle() {
		const top = 50 + rand();
		const left = 50 + rand();
		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
		};
	}

	const deleteEmp = async (employee) => {
		const res = await fetch(`http://localhost:3000/api/employee`, {
			method: "DELETE",
			headers: {
				Accept: "application/json, text/plain, */*",
				"User-Agent": "*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(employee._id),
		});
		const response = await res.json();
		console.log(response);
		Router.reload;
	};

	return (
		<div className="card" style={{ width: "18rem" }}>
			<div className="card-body">
				<div className="avatar" onClick={() => handleOpen()}>
					<img src={employee.image_url} className="card-img-top" alt="" />
				</div>

				<h5 className="card-title ">{employee.name.toUpperCase()}</h5>
				<p className="card-text">{employee.title}</p>
				<Stack direction="row" spacing={2}>
					<IconButton aria-label="edit">
						<EditIcon />
					</IconButton>
					<IconButton aria-label="delete" onClick={() => deleteEmp(employee)}>
						<DeleteIcon />
					</IconButton>
				</Stack>
			</div>
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
				// onBackdropClick={() => handleClose()}
			>
				<div style={modalStyle} className={classes.paper}>
					<h2>{employee.name}</h2>
					<p>{employee.description}</p>
				</div>
			</Modal>
		</div>
	);
};

export default EmpCard;
