import React from "react";
// Components
import {Toast} from "#components";
// Other imports
import {useContractUploadManager} from "#hooks";
import {withdrawFunds} from "#utils/contractFunctions";


export const WithdrawDisplay = (props) => {
	const {ownerRole, agreementAddress} = props;

	// Submit the withdraw request to smart contract
	const submitFn = ({provider, chainId, setContractEvent, setContractError}) => {
		withdrawFunds({agreementAddr:agreementAddress, provider:provider, chainId:chainId, setContractEvent:setContractEvent, setContractError:setContractError});
	}

	// Get UI states from the manager hook
	const {
		loadingState, 
		showToastSucc, 
		toggleShowSucc, 
		showToastErr, 
		toggleShowErr,
		handleSubmit
	} = useContractUploadManager({
		successName: "ViewCountResponse",
		successFn: () => {},
		errorName: "ViewCountResponseError",
		errorFn: () => {},
		submitFn: submitFn
	})
	

	// Only the influencer can withdraw
	if (ownerRole === "influencer") {
		return (
			<>
				<Toast 
				title="Withdraw Success!" 
				body="Success"
				show={showToastSucc}
				toggleShow={toggleShowSucc}
				/>

				<Toast 
				title="Withdraw Error" 
				body="There was an error with withdrawing. Try again or contact Dapplu."
				show={showToastErr}
				toggleShow={toggleShowErr}
				/>

				<div className="d-inline ms-3">
					<button
						type="button"
						className="btn btn-success"
						onClick={() => handleSubmit()}
					>
						{
							(loadingState) ?
							<> 
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Wait...
							</>
							:
							<>
								Withdraw
							</>
						}
					</button>
				</div>
			</>
		);
	} else {
		return ("")
	}
};

export default WithdrawDisplay;