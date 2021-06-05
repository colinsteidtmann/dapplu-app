import React from "react";
// component imports
import {Toast} from "#components";
import FormikForm from "./FormikForm";
// Other imports
import {useContractUploadManager, useCurrencyConversion} from "#hooks";
import {createAgreement} from "#utils/contractFunctions";

export const CreateAgreement = (props) => {
    const convertFn = useCurrencyConversion();

    // Submit the withdraw request to smart contract
    const submitFn = ({values, provider, chainId, setContractEvent, setContractError}) => {
        createAgreement({convertFn:convertFn, formInputs:values, provider:provider, chainId:chainId, setContractEvent:setContractEvent, setContractError:setContractError})
            
    };

    // Get UI states from the manager hook
    const {
        loadingState, 
        showToastSucc, 
        toggleShowSucc, 
        showToastErr, 
        toggleShowErr,
        handleSubmit
    } = useContractUploadManager({
        successName: "AgreementCreated",
        successFn: () => {},
        errorName: "AgreementCreatedError",
        errorFn: () => {},
        submitFn: submitFn
    })

    return ( <
        >

        <Toast 
        title="Successfully Created!" 
        body="Great work"
        show={showToastSucc}
        toggleShow={toggleShowSucc}
        />

        <Toast 
        title="Failed to create!" 
        body="There was an error with creating the agreement. Try again or contact Dapplu."
        show={showToastErr}
        toggleShow={toggleShowErr}
        />

        <div className="row justify-content-center py-5 px-4">
        	<h1 className="display-6 text-center">Create an Agreement</h1>
        	<div className="col-12 col-lg-9 col-xl-7">
        		<FormikForm handleSubmit={handleSubmit} loadingState={loadingState} />
        	</div>
		</div> 
        <
        />
    );
};

export default CreateAgreement;