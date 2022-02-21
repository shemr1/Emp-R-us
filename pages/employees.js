/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import styles from "../styles/Local.module.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useSession, getSession } from "next-auth/react";
import EmpCard from "../components/employeeCard";
import React, { useState, useEffect } from "react";

export default function Home({}) {
	const [info, setInfo] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const { data: session, status } = useSession();

	if (status === "loading") {
		useEffect(() => {});
		return <p>Loading...</p>;
	}

	if (status === "unauthenticated") {
		useEffect(() => {});
		return <p>Access Denied</p>;
	}

	if (status === "authenticated") {
		const fetchdata = async () => {
			const session = await getSession();

			const res = await fetch(`http://localhost:3000/api/employee`, {
				method: "GET",
				headers: {
					Accept: "application/json, text/plain, */*",
					"User-Agent": "*",
					"Content-Type": "application/json",
					user: session.userId,
				},
			});
			const data = await res.json();

			setInfo(data.data);
		};

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			setLoading(true);

			fetchdata();
			setLoading(false);
		}, []);

		if (!isLoading) {
			return (
				<div>
					<div className={styles.body}>
						<h3>Employees</h3>

						<Link href="/NewEmp">
							<Fab className={styles.button} variant="extended">
								<AddIcon />
								Add Employee
							</Fab>
						</Link>
						<br />
						<div className="clearfix">
							<div className="row">
								{info.map((employee) => (
									// eslint-disable-next-line react/jsx-key
									<div className="col-md-3 animated fadeIn" key={employee._id}>
										<EmpCard employee={employee} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			);
		}
	} else {
		return <></>;
	}
}
