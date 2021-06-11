import {currencyInfo, tokensInfo, chainInfo} from "#constants";

export const tolocaleString = ({number}) => {
	if (number !== undefined) {
		return number.toLocaleString();
	} else {
		return number
	}
}


export const getCurrencyIcon = ({currencyId}) => {
	try {
		return currencyInfo.find(currency => currency.id === currencyId).icon;
	} catch (error) {
		console.log(error)
		return "Unknown currency icon"
	}
}

export const getCurrencySymbol = ({currencyId}) => {
	try {
		return currencyInfo.find(currency => currency.id === currencyId).symbol;
	} catch (error) {
		console.log(error)
		return "Unknown currency symbol"
	}
}


export const getTokenIcon = ({tokenId}) => {
	try {
		return tokensInfo.find(token => token.id === tokenId).icon;
	} catch (error) {
		console.log(error)
		return "Unknown token icon"
	}
}

export const getTokenSymbol = ({tokenId}) => {
	try {
		return tokensInfo.find(token => token.id === tokenId).symbol;
	} catch (error) {
		console.log(error)
		return "Unknown token symbol"
	}
}

export const getChainName = ({chainId}) => {
	if (!chainId) {
		return "Unknown network";
	}
	
	try {
		return chainInfo.find(chain => chain.id === chainId).name;
	} catch (error) {
		console.log(error);
		return "Unknown network";
	}
}


export const getSupportedChainNames = () => {
	try {
		let supportedNames = ""
		chainInfo.forEach((chain) => {
			if (chain.supported) {
				supportedNames += ` ${chain.name}`
			}
		});
		return supportedNames;
	} catch (error) {
		console.log(error);
		return "Unknown supported networks";
	}
}

