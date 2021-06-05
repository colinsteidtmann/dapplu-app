import React from "react";
import {useLocation} from "react-router-dom";
// components
import {IndividualAgreement, BackButton} from "#components";




export const Agreement = (props) => {
	const location = useLocation();
	const agreement = location.state?.agreement;
	const {isBrand} = props;
	return(
		<>
			<BackButton to="/" />
			<IndividualAgreement agreement={agreement} isBrand={isBrand} />
		</>
	);
}

export default Agreement;