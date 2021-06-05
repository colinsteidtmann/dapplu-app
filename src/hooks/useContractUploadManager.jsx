import {useState, useEffect} from "react";
import {useProviderStore, useGeneralStore} from "#hooks";


export const useContractUploadManager = ({successName, successFn, errorName, errorFn, submitFn}) => {

	// Get web3 info to proccess transactions
	const chainId = useProviderStore(state => state.chainId);
	const provider = useProviderStore(state => state.provider);
	
	// Manage toast success and error messages
	const [showToastSucc, setShowToastSucc] = useState(false);
	const toggleShowSucc = () => setShowToastSucc(!showToastSucc);
	const [showToastErr, setShowToastErr] = useState(false);
	const toggleShowErr = () => setShowToastErr(!showToastErr);

	// Manage loading button (spinner state)
	const [loadingState, setLoadingState] = useState(false);

	// Know when the web3 transaction succeeds or fails
	const contractError = useGeneralStore(state => state.contractError);
	const contractEvent = useGeneralStore(state => state.contractEvent);
	const setContractEvent = useGeneralStore(state => state.setContractEvent);
	const setContractError = useGeneralStore(state => state.setContractError);

	// Shows toast message in response to media link updating or failing to update
	// Stop loading spinner and hide editor regardless of succeed or failure. 
	useEffect(() => {

		if (contractEvent && contractEvent.name === successName) {
			setLoadingState(false);
			setShowToastSucc(true);
			successFn()
		}

		if (contractError && contractError.name === errorName) {
			setLoadingState(false);
			setShowToastErr(true);
			setContractError(null); // reset error message
			errorFn();
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contractEvent, contractError])

	// Start loading spinner, then,
	// Try uploading the media link to the contract
	// If the user isn't connected with their web3 wallet, then emit error to alert them
	const handleSubmit = (values) => {
		setLoadingState(true);

		if (!provider) {
			setContractError({name:errorName, value:"Can't do anything without being connected to site with wallet"});
			setLoadingState(false);
		} else {
			submitFn({
				values:values,
				provider: provider, 
				chainId: chainId, 
				setContractEvent: setContractEvent, 
				setContractError: setContractError
			});
		}
	}

	return {loadingState, setLoadingState, showToastSucc, toggleShowSucc, showToastErr, toggleShowErr, handleSubmit}

}

export default useContractUploadManager;