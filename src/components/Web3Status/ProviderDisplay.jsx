import React from "react";
// component imports
import {Identicon} from "#components";
import AccountDetails from "./AccountDetails";
// other imports
import {shortenAddress} from "#utils";
import {chainName} from "#constants";

export const ProviderDisplay = (props) => {
	const {account, chainId} = props;
	const modalId = "accountDetails"; 
	return (
		<>
			<div className="float-end">
				<button className="btn btn-outline-primary mx-2" disabled>{chainName[chainId]}</button>
				<button type="button" className="btn btn-outline-primary text-nowrap ms-2 me-0" data-bs-toggle="modal" data-bs-target={"#"+modalId}>
					<span className="me-2">{shortenAddress({address:account})}</span>
					<Identicon />
				</button>
			</div>

			<AccountDetails id={modalId} />
		</>
	);
}

export default ProviderDisplay;


