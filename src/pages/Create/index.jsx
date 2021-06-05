import React from "react";
// components
import {CreateAgreement, BackButton} from "#components";
// custom imports


export const Create = () => {
	return(
		<>
			<BackButton to="/" />
			<CreateAgreement />
		</>
	);
}

export default Create;