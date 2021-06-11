import React from "react";
// Hooks
import { useProviderStore } from '#hooks'; 
// Others
import {getSupportedChainNames, getChainName} from "#utils/dappFunctions";
import {isChainSupported} from "#utils";

const Alert = (props) => {
	const {children} = props;

	return (
		<div className="alert alert-danger position-sticky top-0 mt-1" role="alert">
			{children}
		</div>
	)

}

export const WrongNetworkAlert = (props) => {
	const providerLoaded = useProviderStore((state) => state.loaded);
	const chainId = useProviderStore((state) => state.chainId);
	const chainSupported = isChainSupported({"chainId":chainId});
	const chainName = getChainName({"chainId":chainId});
	const supportedChainNames = getSupportedChainNames();

	if (!providerLoaded) {
		return (
			<Alert>
				Please connect to the app with your wallet.
			</Alert>
		);
	} else if (!chainSupported) {
		return (
			<Alert>
				Sorry {chainName} is not supported at the moment. 
				Please use one of our supported chains - {supportedChainNames}
			</Alert>
		);	
	} else {
		return ("");
	}

}

export default WrongNetworkAlert;