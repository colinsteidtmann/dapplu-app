import React from "react";
import {formStatuses} from "#constants";

export const ConfirmationScreen = (props) => {
	const {setDisplayState, title, body, buttonText} = props;
	return (
		<div className="alert alert-primary">
			<h3 className="text-center mb-5">
			  <i className="fas fa-check-circle text-success pe-3"></i>
			  {title || "Success, we got your message!"}
			  
			</h3>
			<h5 className="mb-5 text-center">
				{body || "Check your inbox for a confirmation. Check spam too."}
			</h5>
			<div className="text-center">
			<button type="submit" className="btn btn-primary btn-lg" onClick={() => setDisplayState(formStatuses.FORM)}>
			  {buttonText || "Back"}
			</button>
			</div>
		</div>
	);
};

export default ConfirmationScreen;