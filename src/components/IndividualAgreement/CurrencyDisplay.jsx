import {useLocalStorage} from "#hooks";
import {getCurrencyIcon, getCurrencySymbol} from "#utils/dappFunctions";

export const CurrencyDisplay = (props) => {
	const userCurrency = useLocalStorage(state => state.userCurrency);
	return (
		<span className="fw-bold me-2">
			{getCurrencyIcon({currencyId: userCurrency})}
			{getCurrencySymbol({currencyId: userCurrency})}
		</span>
	);
}

export default CurrencyDisplay;