import {useLocalStorage} from "#hooks";
import {getCurrencyIconAndSymbol} from "#utils/dappFunctions";

export const CurrencyDisplay = (props) => {
	const userCurrency = useLocalStorage(state => state.userCurrency);
	return (
		<span className="fw-bold me-2">{getCurrencyIconAndSymbol({currencyId:userCurrency})}</span>
	);
}

export default CurrencyDisplay;