import React, {useState} from "react";
import {Toast} from "#components";
import {useContractUploadManager} from "#hooks";
import {uploadMediaString} from "#utils/contractFunctions";


const MediaString = (props) => {
	const {mediaLinkInput, ownerRole, agreementAddress} = props;

	// Manage edit and view mode
	const [editMode, setEditMode] = useState(true); 
	const [mediaLink, setMediaLink] = useState(mediaLinkInput);

	// Return to view mode after trying to edit media link.
	const error_succcess_fn = () => {
		setEditMode(!editMode);
	}

	// Try uploading the media link to the contract
	const submitFn = ({provider, chainId, setContractEvent, setContractError}) => {
		uploadMediaString({mediaString:mediaLink, agreementAddr:agreementAddress, provider:provider, chainId:chainId, setContractEvent:setContractEvent, setContractError:setContractError});
	}

	// Get UI states from the manager hook
	const {
		loadingState, 
		showToastSucc, 
		toggleShowSucc, 
		showToastErr, 
		toggleShowErr,
		handleSubmit,
	} = useContractUploadManager({
		successName: "MediaUpdated",
		successFn: error_succcess_fn,
		errorName: "MediaUpdatedError",
		errorFn: error_succcess_fn,
		submitFn: submitFn
	})

	// Only let influencers upload a media link
	// If a media link is empty, then just return a message telling others that the influencer 
	// hasn't uploaded one yet
	if (ownerRole === "brand" || ownerRole === "none") {
		if (mediaLink.length === 0 ){
			return "The influencer hasn't uploaded one yet";
		} else {
			return(mediaLink)
		}
	}  

	return (
		<>	
			<Toast 
			title="Media Link Updated!" 
			body="Success"
			show={showToastSucc}
			toggleShow={toggleShowSucc}
			/>

			<Toast 
			title="Media Link Updated Error" 
			body="There was an error updated the agreement. Try again maybe."
			show={showToastErr}
			toggleShow={toggleShowErr}
			/>


			<div className="input-group">
				<input 
					type="text" 
					placeholder="eg. cPqK_zkTXIk"
					onChange={e => setMediaLink(e.target.value)}
					className={editMode ? "form-control-plaintext" : "form-control"}
					value={mediaLink}
					readOnly={editMode && "readOnly"}
					style={{"width":"min-content"}} 
				/>
				<button 
					type="button" 
					className="btn btn-primary" 
					onClick={() => editMode ? setEditMode(!editMode) : handleSubmit()}>

					{editMode ? 
						"Edit"
					: 
						<>
							<>
								{
									(loadingState) ?
									<> 
										<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
										Wait...
									</>
									:
									<>
										Update
									</>
								}
							</> 
						</>
					}
				</button>
			</div>
			
		</>
	);
	
}

export default MediaString;