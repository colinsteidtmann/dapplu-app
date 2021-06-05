import React from "react";
// component imports
import ProviderDisplay from "./ProviderDisplay";
import ConnectButton from "./ConnectButton";
// custom imports
import { useProviderStore } from '#hooks';







export const Web3Status = () => {
	const account = useProviderStore((state) => state.account);
	const chainId = useProviderStore((state) => state.chainId);

	if (account) {
		return (
			<>
				<ProviderDisplay account={account} chainId={chainId} />
			</>
		);
	} else {
		return(
			<>
				<ConnectButton />
			</>
		);
	}

}

export default Web3Status;