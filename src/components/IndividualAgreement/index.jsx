import React from "react";
import {useParams} from "react-router-dom";
// component imports
import WithdrawDisplay from "./WithdrawDisplay";
import MediaString from "./MediaString";
import WrittenAgreementLink from "./WrittenAgreementLink";
import InfoItem from "./InfoItem";
import CurrencyDisplay from "./CurrencyDisplay";
// custom imports
import {useAgreement, useLocalCurrency, useViewCountApi} from "#hooks";
import {getCurrencyIconAndSymbol, tolocaleString} from "#utils/dappFunctions";
import {formatCurrency} from "#utils/contractFunctions";

const LoadingDisplay = () => {
	return (
		<p>Loading ... </p>
	);
}

const MainDisplay = (props) => {
	const {agreement} = props;
    const {
    	agreementAddress,
    	agreementFileUrl,
    	agreementName,
    	agreementStatus,
    	brand,
    	budget,
    	budgetRemaining,
    	influencer,
    	longCreatedDate,
    	longEndDate,
    	mediaLink,
    	ownerRole,
    	payPerView,
    	tokenId,
    } = agreement;

    let localPayPerView, localBudget, localBudgetRemaining, localPayWithdrawn, maxWithdrawAvailable, withdrawAvailable, viewsCount;

    viewsCount = useViewCountApi(mediaLink);
    localPayPerView = formatCurrency({amount:useLocalCurrency({amount:payPerView, from:tokenId})});
    localBudget = formatCurrency({amount:useLocalCurrency({amount:budget, from:tokenId})});
    localBudgetRemaining = formatCurrency({amount:useLocalCurrency({amount:budgetRemaining, from:tokenId})});
    localPayWithdrawn = (localBudget - localBudgetRemaining);
	maxWithdrawAvailable = (viewsCount * localPayPerView);
    withdrawAvailable =  Math.min(maxWithdrawAvailable, localBudgetRemaining);

    return ( <
        >
        <div className="container-fluid row">
        		<h4 className="text-center mt-3 mb-2">{agreementName}</h4>
        		<p className="text-secondary  mb-5">Created {longCreatedDate}</p>
				<div className="col-12 col-lg-4 text-start mx-auto ">
					<InfoItem>
						<InfoItem.Label text="Agreement Status">
							{
								(agreementStatus === "Pending") && 
								<InfoItem.Tooltip text="Pending until the influencer uploads a media id" placement="top" />
							}
						</InfoItem.Label>
						<InfoItem.Body text={agreementStatus} />
					</InfoItem>

					<InfoItem>
						<InfoItem.Label text="Brand Address" />
						<InfoItem.Body text={brand} />
					</InfoItem>

					<InfoItem>
						<InfoItem.Label text="Influencer Address" />
						<InfoItem.Body text={influencer} />
					</InfoItem>


					<InfoItem>
						<InfoItem.Label text="End Date" />
						<InfoItem.Body text={longEndDate} />
					</InfoItem>

					<InfoItem>
						<InfoItem.Label text="Written Agreement" />
						<InfoItem.Body 
							text={<WrittenAgreementLink url={agreementFileUrl} />}
						/>
							

					</InfoItem>

					<InfoItem>
						<InfoItem.Label text="Media ID" />
						<InfoItem.Body>
							<MediaString mediaLinkInput={mediaLink} ownerRole={ownerRole} agreementAddress={agreementAddress} />
						</InfoItem.Body>
					</InfoItem>


				</div>
				<div className="col-12 col-lg-4 text-start mx-auto ">

					<InfoItem>
						<InfoItem.Label text="Currency Paid With" />
						<InfoItem.Body>
							{getCurrencyIconAndSymbol({currencyId:tokenId})}
						</InfoItem.Body>
					</InfoItem>

					<InfoItem>
						<InfoItem.Label text="Budget" />
						<InfoItem.Body
							text={tolocaleString({number:localBudget})}
						>
							<CurrencyDisplay /> 
						</InfoItem.Body>
					</InfoItem>

					<InfoItem>
						<InfoItem.Label text="Pay Per View" />
						<InfoItem.Body
							text={tolocaleString({number:localPayPerView})}
						>
							<CurrencyDisplay /> 
						</InfoItem.Body>
					</InfoItem>

					<InfoItem>
						<InfoItem.Label text="View Count" />
						<InfoItem.Body
							text={tolocaleString({number:viewsCount})}
						/>
					</InfoItem>


					<InfoItem>
						<InfoItem.Label text="Available to Withdraw" />
						<InfoItem.Body>
							<CurrencyDisplay /> 
							<InfoItem.Body.Text>
								{tolocaleString({number:withdrawAvailable})}
							</InfoItem.Body.Text>
							<WithdrawDisplay ownerRole={ownerRole} agreementAddress={agreementAddress} />
						</InfoItem.Body>
					</InfoItem>


					<InfoItem>
						<InfoItem.Label text="Pay Withdrawn" />
						<InfoItem.Body
							text={tolocaleString({number:localPayWithdrawn})}
						>
							<CurrencyDisplay/> 
						</InfoItem.Body>
					</InfoItem>

				</div>
			</div> 
			<
        />
    );
}



export const IndividualAgreement = (props) => {
	const {addr} = useParams();
    const agreement = useAgreement(addr);

    if (!agreement) {
    	return(
    		<LoadingDisplay />
    	);
    }
    return (
    	<MainDisplay agreement={agreement} />
    );

}

export default IndividualAgreement;