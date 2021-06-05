import {currencyInfo} from "#constants";

export const tolocaleString = ({number}) => {
	if (number !== undefined) {
		return number.toLocaleString();
	} else {
		return number
	}
}

export const getCurrencySymbol = ({currencyId}) => {
	return currencyInfo.find(currency => currency.id === currencyId).symbol;
}

export const getCurrencyIconAndSymbol = ({currencyId}) => {
	const currencyObject =  currencyInfo.find(currency => currency.id === currencyId);
	return currencyObject.icon({text: currencyObject.symbol})
}



