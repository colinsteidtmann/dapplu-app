import {useEffect} from "react";
import {useProviderStore, useGeneralStore} from "#hooks";
import {getDisplayAgreementDetails, getUsersAgreementAddresses} from "#utils/contractFunctions";
import {isChainSupported} from "#utils";

// Get's an ethereum user's agreements created
export const useAllAgreements = () => {
    const usersAgreements = useGeneralStore(state => state.usersAgreements);
    const contractEvent = useGeneralStore(state => state.contractEvent);
    const setUsersAgreements = useGeneralStore(state => state.setUsersAgreements);
    const account = useProviderStore(state => state.account);
    const chainId = useProviderStore(state => state.chainId);
    const provider = useProviderStore(state => state.provider);
    const chainSupport = isChainSupported({"chainId":chainId});



    useEffect(() => {
        const updateUsersAgreements = async() => {
            const addresses = await getUsersAgreementAddresses({usersAccount:account, chainId:chainId, provider:provider});
            let detailsCollection = [];
            addresses.map(async(addressObject) => {
                const address = addressObject.baseAgreementAddress;
                const displayDetails = await getDisplayAgreementDetails({agreementAddr:address, chainId:chainId, provider:provider});
                detailsCollection.push({
                    ownerRole: addressObject.ownerRole,
                    ...displayDetails
                });
                setUsersAgreements([...detailsCollection]);
            });
        }

        if (account && chainId && provider && usersAgreements.length === 0 && chainSupport) {
            updateUsersAgreements();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, chainId, provider, chainSupport, contractEvent])

    return usersAgreements;
}

export default useAllAgreements;