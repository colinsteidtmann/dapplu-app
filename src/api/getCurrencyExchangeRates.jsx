import axios from "axios";

// Takes currency symbols (eg. USD and USDT) and returns fromCurrency amount in toCurrency
export const getCurrencyExchangeRates = async(fromCurrency, toCurrency) => {
	const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`
  try {
    const response = await axios.get(url);
    return response.data[fromCurrency][toCurrency];
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default getCurrencyExchangeRates;

