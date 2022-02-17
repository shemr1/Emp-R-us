import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<div className="content">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
