import React, {useState} from "react";
import {useProviderStore} from "#hooks";
import {tokensInfo} from "#constants";
import {isTokenSupported} from "#utils";

export const TokenPaymentOption = (props) => {
	const [paymentToken, setPaymentToken] = useState(0);
	const {values, id} = props;
	const chainId = useProviderStore((state) => state.chainId);
	return (
	    <div>
			<div className="btn-group d-block w-max-content ">
			  <button type="button" className="btn btn-outline-primary">
			    {tokensInfo.find(token => token.id === paymentToken).symbol}
			  </button>
			  <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
			    <span className="visually-hidden">Toggle Dropdown</span>
			  </button>
			  <ul className="dropdown-menu">
			  	{tokensInfo.map((token, index) => (

			  		isTokenSupported({"tokenId":token.id, "chainId":chainId}) &&
		  				<li key={index}>
		  				  <button
		  				    type="button"
		  				    onClick={()=>{setPaymentToken(token.id); values[id]=token.id}}
		  				    className="dropdown-item"
		  				  >
		  				    {token.symbol}
		  				  </button>
		  				</li>


			  	))}
			  </ul>
			</div>
		</div>
	);
}

export default TokenPaymentOption;