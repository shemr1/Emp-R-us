/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "../styles/Local.module.css";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/react";

const Navbar = () => {
	const session = useSession();
	console.log(session);

	if (session.data === undefined || session.data === null) {
		return (
			<div className={styles.navbar}>
				<nav className="navbar navbar-expand-md navbar-dark bg-dark mt-0">
					<div className="navbar-brand d-flex">
						<img src="/logo.png" alt="logo" width={30} height={30} />
						<span className="navbar brand">Skills Bank</span>
					</div>
					<div className="collapse navbar-collapse d-flex justify-content-between text-light">
						<ul className="navbar-nav mr-auto mx-auto">
							<Link className="nav-item" href="/employees">
								<a className="nav-link ">Employees</a>
							</Link>
							<Link className="nav-item" href="/about">
								<a className="nav-link ">About</a>
							</Link>
							<Link className="nav-item" href="/contact">
								<a className="nav-link ">Contact Us</a>
							</Link>
						</ul>

						<div className="d-flex justify-content-end mt-2 mt-md-0">
							<div>
								<>
									Not signed in <br />
									<button onClick={() => signIn()}>Sign in</button>
								</>
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
	if (session.data) {
		return (
			<>
				<div className={styles.navbar}>
					<nav className="navbar navbar-expand-md navbar-dark bg-dark mt-0">
						<div className="navbar-brand d-flex">
							<img src="/logo.png" alt="logo" width={30} height={30} />
							<span className="navbar brand">Skill Bank</span>
						</div>
						<div className="collapse navbar-collapse d-flex justify-content-between text-light">
							<ul className="nav navbar-nav  mr-auto mx-auto ">
								<Link className="nav-item " href="/employees">
									<a className="nav-link link-light">Employees</a>
								</Link>
								<Link className="nav-item" href="/about">
									<a className="nav-link link-light">About</a>
								</Link>
								<Link className="nav-item" href="/contact">
									<a className="nav-link link-light">Contact Us</a>
								</Link>
							</ul>

							<div className="d-flex justify-content-end mt-2 mt-md-0 p-2">
								<img
									src={session?.data.user.image}
									className="img-fluid rounded-circle"
									alt="logo"
									width={35}
									height={35}
								/>

								<h5 className="p-2"> {session.data.user?.name} </h5>

								<button
									onClick={() => signOut()}
									className="btn btn-light btn-outline-secondary ml-5"
								>
									Sign out
								</button>
							</div>
						</div>
					</nav>
				</div>
			</>
		);
	}
};

export default Navbar;
