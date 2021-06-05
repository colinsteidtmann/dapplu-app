import {useCallback} from "react";
import {useLocalStorage} from "#hooks";
import {getCurrencyExchangeRates} from "#api";
import {tokensInfo, currencyInfo} from "#constants";

export const useCurrencyConversion = () => {
	const userCurrency = useLocalStorage(state => state.userCurrency);

	// returns userCurrency/token eg. $500/eth
	const getRate = async(from, to) => {
		const userCurrencyName = currencyInfo.find(currency => 
			currency.id === to
		).name;

		const tokenName = tokensInfo.find(token => 
			token.id === parseInt(from)
		).name;

		const exchangeRate = await getCurrencyExchangeRates(tokenName, userCurrencyName);

		return exchangeRate;

	}

	const convert = useCallback(async({amount, from}) => {
			const rate = await getRate(from, userCurrency);
			const convertedValue = amount * rate;
			return convertedValue;
	}, [userCurrency])

	return convert;
}

export default useCurrencyConversion;