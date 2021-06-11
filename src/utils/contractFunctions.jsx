import {ethers} from "ethers";
import fleek from '@fleekhq/fleek-storage-js';   
import {tokensInfo, chainlinkInfo, contractsInfo, agreementStatusInfo} from "#constants";
import {isUndefined} from "./";


/*
 *  Helper functions
 */
 
/* eslint-disable no-unused-vars */
 const getBaseAgreementAddress = ({chainId}) => {
 	return contractsInfo.find(contract => contract.chainId === chainId).baseAgreement.address;
 }
/* eslint-disable no-unused-vars */

 const getBaseAgreementAbi = ({chainId}) => {
 	return contractsInfo.find(contract => contract.chainId === chainId).baseAgreement.abi;
 }

 const getBaseAgreementContract = ({chainId, provider, address}) => {
 	const abi = getBaseAgreementAbi({chainId: chainId});
 	return new ethers.Contract(address, abi, provider);
 }


const getAgreementFactorySalt = ({chainId}) => {
	return contractsInfo.find(contract => contract.chainId === chainId).agreementFactory.address;
}

const getAgreementFactoryAddress = ({chainId}) => {
	return contractsInfo.find(contract => contract.chainId === chainId).agreementFactory.address;
}

const getAgreementFactoryAbi = ({chainId}) => {
	return contractsInfo.find(contract => contract.chainId === chainId).agreementFactory.abi;
}

const getFactoryContract = ({chainId, provider}) => {
	const address = getAgreementFactoryAddress({chainId:chainId});
	const abi = getAgreementFactoryAbi({chainId:chainId});
	return new ethers.Contract(address, abi, provider);
}

const getERC20Abi = ({chainId}) => {
	return contractsInfo.find(contract => contract.chainId === chainId).erc20.abi;
}

const getERC20Contract = ({chainId, tokenId, provider}) => {
	const abi = getERC20Abi({chainId:chainId});
	const erc20Address = getTokenAddress({tokenId:tokenId, chainId:chainId});
	return new ethers.Contract(erc20Address, abi, provider);
}

const getTokenContract = ({tokenContractAddress, chainId, provider}) => {
	const abi = getERC20Abi({chainId:chainId});
	return new ethers.Contract(tokenContractAddress, abi, provider);
}


const getTokenIdFromAddress = ({tokenAddress, chainId}) => {
	return tokensInfo.find(token => 
		(token.addresses.find(tokenAddressInfo => tokenAddressInfo.chainId === chainId).address) === tokenAddress
	).id
}

export const getTokenAddress = ({tokenId, chainId}) => {
	const tokenAddresses = tokensInfo.find(token => token.id === tokenId).addresses;
	return tokenAddresses.find(token => token.chainId === chainId).address;
}

const getTokenDecimals = ({tokenId}) => {
	return tokensInfo.find(token => token.id === tokenId).decimals;
}

const getLinkTokenAddress = ({chainId}) => {
	return chainlinkInfo.find(chainlink => chainlink.chainId === chainId).linkTokenAddress;
}

const getChainlinkJobId = ({chainId}) => {
	const jobId = chainlinkInfo.find(chainlink => chainlink.chainId === chainId).jobId;
	return jobId;
}

const getLinkContract = ({chainId, provider}) => {
	const abi = getERC20Abi({chainId:chainId});
	const linkAddress = getLinkTokenAddress({chainId:chainId});
	return new ethers.Contract(linkAddress, abi, provider);
}

const getOracleAddress = ({chainId}) => {
	return chainlinkInfo.find(chainlink => chainlink.chainId === chainId).oracleAddress;
}

const getOracleFee = ({chainId}) => {
	return chainlinkInfo.find(chainlink => chainlink.chainId === chainId).oracleFee;
}

const getSendAmount = ({amount, usingEth}) => {
	return (usingEth) ? amount : 0
}

export const getContractEthBalance = async({provider, address}) => {
	const ethBalance = (await provider.getBalance(address)).toString();
	return ethBalance;
}

const getContractTokenBalance = async({provider, chainId, tokenId, contractAddress}) => {
	const erc20Contract = getERC20Contract({chainId:chainId, tokenId:tokenId, provider:provider});
	const tokenBalance = (await erc20Contract.balanceOf(contractAddress)).toString();
	return tokenBalance;
}

/* eslint-disable no-unused-vars */
const getLinkBalance = async({provider, chainId, contractAddress}) => {
	const linkContract = getLinkContract({chainId:chainId, provider:provider});
	const linkBalance = (await linkContract.balanceOf(contractAddress)).toString();
	return linkBalance;
}
/* eslint-disable no-unused-vars */

const getStatusName = ({statusId}) => {
	return agreementStatusInfo.find(status => status.id === statusId).name;
}

// return Wed Jan 23 2019
const getDateLong = ({dateObj}) => {
	return dateObj.toDateString();
}

// return 23/01/2019
const getDateShort = ({dateObj}) => {
	return dateObj.toLocaleDateString();
}

const formatPaymentUnits = ({amountString, decimals}) => {
	return ethers.utils.formatUnits(amountString, decimals);
}

const toUnixTime = ({date}) => {
	// Return date if not a Date object
	if (Object.prototype.toString.call(date) !== "[object Date]") return date;
	return parseInt((date.getTime() / 1000).toFixed(0));
}

const toContractCurrency = ({amount, conversionRate, paymentTokenId}) => {
	const ethEquivalent = ((1/conversionRate) * amount).toString();
	const weiEquivalent1 = (parseInt(ethEquivalent * (10 ** 10))).toString(); //clear floats
	const weiEquivalent2 = ethers.utils.parseUnits(weiEquivalent1, (getTokenDecimals({tokenId:paymentTokenId}) - 10)).toString();
	return weiEquivalent2;
}

/* eslint-disable no-unused-vars */
const padHex = ({input, bytesNumber}) => {
	return ethers.utils.hexZeroPad(input, bytesNumber);
}
/* eslint-disable no-unused-vars */

const isUsingEth = ({tokenId}) => {
	return tokensInfo.find(token => token.id === tokenId).name === "ethereum";
}

export const formatCurrency = ({amount}) => {
	if (!isUndefined({input:amount})) {
		const amountFloat = parseFloat(amount);
		if (amountFloat < 1 ) {
			return (amountFloat).toPrecision(5);
		} else {
			return (amountFloat).toFixed(2);
		}
	}
}




/*
 *  Agreement factory contract functions
 */
 
const getCreatedAgreementEvent = async ({txReceipt, emitter, eventName}) => {
 	const res = await txReceipt.wait();
 	const eventsWithEventName = res.events.filter((e) => e.event === eventName);
 	const event = eventsWithEventName.filter((e) => e.transactionHash === txReceipt.hash)[0];
 	return event;
}

const uploadToFleek = async({inputs, agreementAddress}) => {	
	const {
		agreementFile,
		agreementName,
	} = inputs;

	let result1;
	if (agreementFile.file) {
		const file = agreementFile.file;

		const agreementFileInput = {
		  apiKey: 'xpJqEFXppKW6KVTQQ+K1wQ==',
		  apiSecret: '1gFCLWN/0bUC0h1WVmn/NgZR4i4LO0LqrFv7YEDevEY=',
		  key: `${agreementAddress}/agreementFile`,
		  data: file,
		};


		result1 = await fleek.upload(agreementFileInput);
	}
	

	const createdDate = (new Date().getTime()) / 1000;
	const agreementInfo = JSON.stringify({
		agreementName: agreementName,
		createdDate: createdDate,
	});

	const agreementInfoInput = {
	  apiKey: 'xpJqEFXppKW6KVTQQ+K1wQ==',
	  apiSecret: '1gFCLWN/0bUC0h1WVmn/NgZR4i4LO0LqrFv7YEDevEY=',
	  key: `${agreementAddress}/agreementInfo`,
	  data: `${agreementInfo}`,
	};

	const result2 = await fleek.upload(agreementInfoInput);

	return({result1, result2});
}

export const createAgreement = async({convertFn, formInputs, provider, chainId, setContractEvent, setContractError}) => {
	/*
		bytes20 _salt,
		address _link,
		address _oracle,
		address _tokenPaymentAddress,
		address payable _brand,
		address payable _influencer,
		uint256 _endDate,
		uint256 _payPerView,
		uint256 _budget,
		bool _usingEth
	*/
	let {
		brandAddress,
		influencerAddress,
		tokenPaymentOption,
		budget,
		endDate,
		payPerView,
	} = formInputs;

	// input vars
	const conversionRate = await convertFn({amount:"1", from:tokenPaymentOption});
	budget = toContractCurrency({amount:budget, conversionRate:conversionRate, paymentTokenId:tokenPaymentOption});
	payPerView = toContractCurrency({amount:payPerView, conversionRate:conversionRate, paymentTokenId:tokenPaymentOption});
	endDate = toUnixTime({date:new Date(endDate)});

	const usingEth = isUsingEth({tokenId:tokenPaymentOption});

	// chainlink vars
	const salt = getAgreementFactorySalt({chainId:chainId});
	const linkTokenAddress = getLinkTokenAddress({chainId:chainId});
	const oracleAddress = getOracleAddress({chainId:chainId});
	const tokenAddress = getTokenAddress({tokenId:tokenPaymentOption, chainId:chainId});

	// factory contract vars
	const factoryContract = getFactoryContract({chainId:chainId, provider:provider});
	const signer = provider.getSigner(); 
	const valueToSend = getSendAmount({amount:budget, usingEth:usingEth});

	// Subscribe to factory contract events
	factoryContract.on("AgreementCreated", (agreement, brand, influencer) => {
		setContractEvent({name:"AgreementCreated", values:{agreement, brand, influencer}});
		console.log("AgreementCreated", agreement, brand, influencer);
	});
	factoryContract.on("PlatformAddressChanged", (addressTo) => {
		setContractEvent({name:"PlatformAddressChanged", values:{addressTo}});
		console.log("PlatformAddressChanged", addressTo);
	})

	// Handle any errors
	provider.on("error", (error) => {
	    setContractError({name:"AgreementCreatedError", values:{error}});
	    console.log("AgreementCreatedError", error)
	});

	// Approve transfer of token if not using eth
	if (!usingEth) {
		const tokenContract = getTokenContract({tokenContractAddress: tokenAddress, chainId: chainId, provider:provider});
		await tokenContract.connect(signer).approve(factoryContract.address, budget);
	}


	// Create the agreement
	try {
		const tx = await factoryContract.connect(signer).createAgreement(
			salt,
			linkTokenAddress,
			oracleAddress,
			tokenAddress,
			brandAddress,
			influencerAddress,
			endDate,
			payPerView,
			budget,
			usingEth,
			{value: valueToSend}
		);

		const event = await getCreatedAgreementEvent({txReceipt:tx, emiter:factoryContract, eventName:"AgreementCreated"});
		const agreementAddr = event.args.agreement;

		// Subscribe to agreement created events
		const baseAgreement = getBaseAgreementContract({chainId: chainId, provider:provider, address:agreementAddr});
		baseAgreement.on("PaidSomeone", (from, to, amount) => {
			setContractEvent({name:"PaidSomeone", values:{from, to, amount}});
			console.log("PaidSomeone", from, to, amount);
		});
		
		uploadToFleek({inputs:formInputs, agreementAddress:agreementAddr});
	} catch (error) {
		provider.emit("error", error);
	}

}


export const getAccountsAgreements = async({lookUpAccount, chainId, provider}) => {
	const factoryContract = getFactoryContract({chainId:chainId, provider:provider});
	const brandAgreementsFilter = factoryContract.filters.AgreementCreated(null, lookUpAccount, null);
	const influencerAgreementsFilter = factoryContract.filters.AgreementCreated(null, null, lookUpAccount);
	const brandLogs = await factoryContract.queryFilter(brandAgreementsFilter);
	const influencerLogs = await factoryContract.queryFilter(influencerAgreementsFilter);
	return {brandLogs, influencerLogs};
}

/*
 *  Base agreement contract functions
 */

const getFromFleek = async({agreementAddress}) => {
	const agreementInfoInput = {
	  apiKey: 'xpJqEFXppKW6KVTQQ+K1wQ==',
	  apiSecret: '1gFCLWN/0bUC0h1WVmn/NgZR4i4LO0LqrFv7YEDevEY=',
	  key: `${agreementAddress}/agreementInfo`,
	  getOptions: ['hash', 'data', 'publicUrl', 'key']
	};

	const agreementFileInput = {
	  apiKey: 'xpJqEFXppKW6KVTQQ+K1wQ==',
	  apiSecret: '1gFCLWN/0bUC0h1WVmn/NgZR4i4LO0LqrFv7YEDevEY=',
	  key: `${agreementAddress}/agreementFile`,
	  getOptions: ['hash', 'data', 'publicUrl', 'key']
	};

	let agreementInfoObject, agreementFileUrl;
	try {
		const agreementInfoResponse = await fleek.get(agreementInfoInput);
		agreementInfoObject = JSON.parse(new TextDecoder("utf-8").decode(agreementInfoResponse.data));
	} catch (err) {
		console.log("No agreementInfo found");
	}

	try {
		const agreementFileResponse = await fleek.get(agreementFileInput);
		agreementFileUrl = agreementFileResponse.publicUrl
	} catch (err) {
		console.log("No agreementFile found");
	}

	return {agreementInfoObject, agreementFileUrl};
}

export const getViewCount = async({agreementAddr, chainId, provider}) => {
	const baseAgreement = getBaseAgreementContract({chainId:chainId, provider:provider, address:agreementAddr});
	const viewCountFilter = baseAgreement.filters.MediaUpdated();
	const viewCountLog = await baseAgreement.queryFilter(viewCountFilter);
	// const views = parseInt(viewCountLog[0].args.viewCount.toString());
	// return(views);
}

export const getUsersAgreementAddresses = async({usersAccount, chainId, provider}) => {
	const {brandLogs, influencerLogs} = await getAccountsAgreements({lookUpAccount:usersAccount, chainId:chainId, provider:provider});
	let addressCollection = [];
	brandLogs.forEach(log => {
		const agreementAddress = log.args.agreement;
		addressCollection.push({ownerRole: "brand", baseAgreementAddress:agreementAddress});
		
	});
	influencerLogs.forEach(log => {
		const agreementAddress = log.args.agreement;
		addressCollection.push({ownerRole: "influencer", baseAgreementAddress:agreementAddress});
		
	});
	return addressCollection;

}

export const getRawAgreementDetails = async({agreementAddr, chainId, provider}) => {
	const baseContract = getBaseAgreementContract({chainId:chainId, provider:provider, address:agreementAddr});
	const details = await baseContract.getAgreementDetails();
	return details;
}

export const getDisplayAgreementDetails = async({agreementAddr, chainId, provider}) => {
	const baseContract = getBaseAgreementContract({chainId:chainId, provider:provider, address:agreementAddr});
	const details = await baseContract.getAgreementDetails();
	
	const tokenPaymentAddress = details._tokenPaymentAddress;
	const tokenId = getTokenIdFromAddress({tokenAddress:tokenPaymentAddress, chainId:chainId});
	const endDateObj = new Date(parseInt(details._endDate.toString() * 1000));
	const tokenDecimals = getTokenDecimals({tokenId:tokenId});
	const payPerView = details._payPerView.toString();
	const budget = details._budget.toString();
	const agreementStatus = details._agreementStatus;
	const usingEth = details._usingEth;
	const mediaLink = details._mediaLink;

	const {agreementInfoObject, agreementFileUrl} = await getFromFleek({agreementAddress:agreementAddr});
	
	// UI vars
	const agreementName = agreementInfoObject.agreementName;
	const {
		_brand,
		_influencer
	} = details;
	const createdDate = new Date(agreementInfoObject.createdDate * 1000);
	const shortCreatedDate = getDateShort({dateObj:createdDate});
	const longCreatedDate = getDateLong({dateObj:createdDate});
	const shortEndDate = getDateShort({dateObj:endDateObj});
	const longEndDate = getDateLong({dateObj:endDateObj});
	const payPerViewFormatted = formatPaymentUnits({amountString:payPerView, decimals:tokenDecimals});
	const budgetFormatted = formatPaymentUnits({amountString:budget, decimals:tokenDecimals});
	const budgetRemainingFormatted = usingEth ? 
		formatPaymentUnits({amountString:await getContractEthBalance({provider:provider, address:agreementAddr}), decimals:tokenDecimals}) 
		: formatPaymentUnits({amountString:await getContractTokenBalance({provider:provider, chainId:chainId, tokenId:tokenId, contractAddress:baseContract.address}), decimals:tokenDecimals});
	const _agreementFileUrl = (agreementFileUrl ? agreementFileUrl : "");
	const _mediaLink = mediaLink ? mediaLink : "";
	const _agreementStatus = getStatusName({statusId:agreementStatus});
	return ({
		agreementName: agreementName,
		agreementAddress: agreementAddr,
		tokenId: tokenId,
		tokenDecimals: tokenDecimals,
		tokenPaymentAddress: tokenPaymentAddress,
		brand: _brand,
		influencer: _influencer,
		shortCreatedDate: shortCreatedDate,
		longCreatedDate: longCreatedDate,
		shortEndDate: shortEndDate,
		longEndDate: longEndDate,
		payPerView: payPerViewFormatted,
		budget: budgetFormatted,
		budgetRemaining: budgetRemainingFormatted,
		agreementFileUrl: _agreementFileUrl,
		usingEth: usingEth,
		mediaLink: _mediaLink,
		agreementStatus: _agreementStatus,
	});

}

export const uploadMediaString = async({mediaString, agreementAddr, provider, chainId, setContractEvent, setContractError}) => {
	const baseAgreement = getBaseAgreementContract({chainId:chainId, provider:provider, address:agreementAddr});

	// subscribe to relevant events
	baseAgreement.on("MediaUpdated", (mediaLink) => {
		setContractEvent({name:"MediaUpdated", values:{mediaLink}});
		console.log("MediaUpdated", mediaLink);
	});

	// handle errors
	provider.on("error", (error) => {
	    setContractError({name:"MediaUpdatedError", values:{error}});
	    console.log("MediaUpdatedError", error)
	});

	try {
		const signer = provider.getSigner();
		const tx = await baseAgreement.connect(signer).approveAgreement(mediaString);
		return(tx);
	} catch (error) {
		provider.emit("error", error);
	}

}

export const withdrawFunds = async({agreementAddr, provider, chainId, setContractEvent, setContractError}) => {
	const jobId = getChainlinkJobId({chainId:chainId});
	const oracleFee = getOracleFee({chainId:chainId});
	const baseAgreement = getBaseAgreementContract({chainId:chainId, provider:provider, address:agreementAddr});

	// subscribe to relevant events
	baseAgreement.on("ViewCountResponse", (viewCount) => {
		setContractEvent({name:"ViewCountResponse", values:{viewCount}});
		console.log("ViewCountResponse", viewCount);
	});

	// handle errors
	provider.on("error", (error) => {
	    setContractError({name:"ViewCountResponseError", values:{error}});
	    console.log("ViewCountResponseError", error)
	});
	
	try {
		const signer = provider.getSigner();
		const tx = await baseAgreement.connect(signer).withdraw(jobId, oracleFee);
		return(tx);
	} catch (error) {
		provider.emit("error", error);
	}

}


