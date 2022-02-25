import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<div
			className="vh-100 bg-dark"
			style={{
				height: "100%",
				backgroundImage: 'url("/pexels-fauxels-3183150.jpg")',
				backgroundSize: "cover",
			}}
		>
			<Navbar />
			<div className="d-flex " style={{ height: "92%" }}>
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
