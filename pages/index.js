import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";

const Cover = () => {
	const session = useSession();
	console.log(session);

	return (
		<div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
			<main className="px-3">
				<h1>Cover your page.</h1>
				<p className="lead">
					Cover is a one-page template for building simple and beautiful home
					pages. Download, edit the text, and add your own fullscreen background
					photo to make it your own.
				</p>
				<p className="lead">
					<a
						href="#"
						className="btn btn-lg btn-secondary fw-bold border-black bg-black"
					>
						Learn more
					</a>
				</p>
			</main>
		</div>
	);
};

export default Cover;
