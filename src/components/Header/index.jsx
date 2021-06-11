import React from "react";
import {Link} from "react-router-dom";
// components
import { Web3Status, UserCurrency, WrongNetworkAlert } from '#components';
// custom imports



export const Navbar = (props) => {
	return (
		<nav className="navbar navbar-light bg-light">
		  <div className="container-fluid">
		    {props.children}
		  </div>
		</nav>
	)

}



export const Header = () => {
	return(
		<>

			<Navbar> 
				<Link className="navbar-brand" to="/">Dapplu</Link>
				<Web3Status />
			</Navbar>
			<WrongNetworkAlert />
			<div className="container-fluid row text-end mt-3 pe-0">
				<UserCurrency />
			</div>
			
		</>
	);
}

export default Header;