import { NavLink } from "react-router";
import Logo from "../../../assets/img/mybloglogo.svg";

export const Page404 = () => {
	return (
		<section className="Page404">
			<img
				src={Logo}
				alt="logo"
			/>
			<section className="Page404_header">
				<h1>Page not found</h1>
				<h3>Return to home page</h3>
			</section>
			<NavLink to={"/"}>
				<span>Return</span>
			</NavLink>
		</section>
	);
};
