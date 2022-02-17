import { SessionProvider, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
					crossOrigin="anonymous"
				/>
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
					crossOrigin="anonymous"
				></script>
			</Head>
			{Component.auth ? (
				<Auth>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Auth>
			) : (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
		</SessionProvider>
	);
}

function Auth({ children }) {
	const { data: session, status, loading } = useSession({ required: true });
	const isUser = !!session?.user;
	console.log(session); // -> undefined in server- but correct in client-console
	React.useEffect(() => {
		if (loading) return; // Do nothing while loading
		if (!isUser) signIn();
	}, [isUser, loading]);

	if (isUser) {
		return children;
	}

	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <div>Loading...</div>;
}
