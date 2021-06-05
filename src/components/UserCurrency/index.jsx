import React from "react";
// component imports
// custom imports
import {useLocalStorage} from "#hooks";
import {currencyInfo} from "#constants";


export const UserCurrency = (props) => {
	const userCurrency = useLocalStorage(state => state.userCurrency);
	const setUserCurrency = useLocalStorage(state => state.setUserCurrency);
	return(
		<>
			<div className="btn-group float-end d-block pe-0">
				<button className="btn btn-success btn-sm btn-sm-md">Current Currency:</button>
				<button
					className="btn btn-primary dropdown-toggle dropdown-toggle-split btn-sm btn-sm-md"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>

					<span className="px-3">{currencyInfo.find(currency => currency.id === userCurrency).symbol}</span>
				</button>
				<ul className="dropdown-menu dropdown-menu-end">
					{currencyInfo.map((currency, index) => (
						<li key={index}>
							<button
								onClick={() => {
									setUserCurrency(currency.id);
								}}
								className="dropdown-item"
							>
								{currency.symbol}
							</button>
						</li>
					))}
				</ul>
			</div>	
		</>
	);
}

export default UserCurrency;