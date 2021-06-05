import {useState, useEffect} from "react";
import {useLocalStorage} from "#hooks";
import {getCurrencyExchangeRates} from "#api";
import {tokensInfo, currencyInfo} from "#constants";

export const useLocalCurrency = ({amount, from}) => {
	const [conversion, setConversion] = useState();
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


	useEffect(() => {

		const convert = async(from, to) => {
			const rate = await getRate(from, to);
			const convertedValue = amount * rate;
			setConversion(convertedValue);
		}

		if (from === userCurrency) {
			setConversion(amount);
		} else {
			convert(from, userCurrency);
		}

	}, [amount, from, userCurrency]);

	return conversion;
}

export default useLocalCurrency;