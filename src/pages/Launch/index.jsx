import React from "react";
import {Link} from "react-router-dom";
// components

import {ViewAgreements} from "#components";


export const Launch = () => {
	return(
		<>
			<div className="row container-fluid justify-content-center mx-auto py-5 px-0">
				<div className="col-12 mb-5">
					<Link to="/create"><button type="button" className="btn btn-primary btn-lg shadow-lg p-3">New Agreement</button></Link>
				</div>
				<div className="col-12 col-lg-10 col-xl-8 mt-5">
					<h1 className="display-6">Your Agreements</h1>
					<hr/>
					<ViewAgreements />
				</div>
			</div>
		</>
	);
}

export default Launch;