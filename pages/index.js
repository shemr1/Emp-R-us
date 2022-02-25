import Image from "next/image";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getSession, useSession } from "next-auth/react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { getCsrfToken } from "next-auth/react";

const theme = createTheme({
	palette: {
		neutral: {
			main: "#64748B",
			contrastText: "#fff",
		},
		dark: {
			main: "#171717",
			contrastText: "#fff",
		},
	},
});
const Cover = () => {
	const session = useSession();
	console.log(session);

	return (
		<ThemeProvider theme={theme}>
			<div
				className="cover-container  mx-auto  "
				style={{ height: "97%", width: "98%" }}
			>
				<br style={{ height: "20%" }} />
				<div className="row  d-flex align-items-center  justify-content-evenly h-100">
					<div className="col-3">
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<h1 className="text-start fs-1 text-light">
							A New Way To Envision Workforce Management
						</h1>
						<br />
						<br />
						<Stack spacing={2} direction="row">
							<Button variant="contained" color="dark">
								Get Started
							</Button>
							<Button variant="contained" color="neutral">
								Learn More
							</Button>
						</Stack>
					</div>
					<div className="col-3"></div>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Cover;
