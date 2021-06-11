import {useState, useEffect} from "react";
// Other imports
import {useProviderStore, useGeneralStore} from "#hooks";
import {getDisplayAgreementDetails} from "#utils/contractFunctions";
import {isChainSupported} from "#utils";

export const useAgreement = (address) => {
	const [agreement, setAgreement] = useState();
	const account = useProviderStore(state => state.account);
	const chainId = useProviderStore(state => state.chainId);
	const provider = useProviderStore(state => state.provider);
	const contractEvent = useGeneralStore(state => state.contractEvent);
	const chainSupport = isChainSupported({"chainId":chainId});

	useEffect(() => {
		const getAgreement = async() => {
			const agreementDetailsObj = await getDisplayAgreementDetails({agreementAddr:address, chainId:chainId, provider:provider});
			if (agreementDetailsObj.brand === account) {
				agreementDetailsObj.ownerRole = "brand";
			} else if (agreementDetailsObj.influencer === account) {
				agreementDetailsObj.ownerRole = "influencer";
			} else {
				agreementDetailsObj.ownerRole = "none";
			}
			setAgreement(agreementDetailsObj);
		}

		if (account && chainId && provider && address && chainSupport) {
			getAgreement();
		}

	}, [account, chainId, provider, address, chainSupport, contractEvent])
	console.log("agreement", agreement);
	return agreement;
}

export default useAgreement;