import Link from "next/link";
import styles from "../styles/Local.module.css";
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
			console.log(session.userId);
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

		useEffect(() => {
			setLoading(true);

			fetchdata();
			setLoading(false);
		}, []);
		if (!isLoading) {
			console.log(info);
			return (
				<div>
					<div className={styles.body}>
						<h3>Employees</h3>

						<Link href="/NewEmp">
							<button className={styles.button}>Add Employee</button>
						</Link>
						<div className={styles.container}>
							{info.map((employee, idx) => (
								<div className={`grid grid-cols-3 gap-4 p-5`}>
									<EmpCard key={idx} employee={employee} />
								</div>
							))}
						</div>
					</div>
				</div>
			);
		}
	} else {
		return <></>;
	}
}
