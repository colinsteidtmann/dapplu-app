import React from "react";
import {KovanAgreementFactory, KovanBaseAgreement, ERC20} from "#abis";
import {ETH, DAI, USDC, USDT, ETH_Currency, USD_Currency} from "#assets/svg";
import {ethers} from "ethers";

export const chainInfo = [
	{
		id: 1,
		name: "Mainnet",
		supported: false
	},
	{
		id: 3,
		name: "Ropsten",
		supported: false
	},
	{
		id: 4,
		name: "Rinkeby",
		supported: false
	},
	{
		id: 42,
		name: "Kovan",
		supported: true
	}
]

export const tokensInfo = [
	{
		"id":0,
		"symbol": "ETH",
		"name": "ethereum",
		"decimals": 18,
		"addresses": [
			{
				chainId: 42,
				address: ethers.constants.AddressZero
			},
		],
		"icon": <img src={ETH} className="img-fluid custom-icon" alt="ETH token icon" />,
	},
	{
		"id":1,
		"symbol": "DAI",
		"name": "dai",
		"decimals": 18,
		"addresses": [
			{
				chainId: 42,
				address: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"
			},
		],
		"icon": <img src={DAI} className="img-fluid custom-icon" alt="DAI token icon" />,
	}, 
	{
		"id":2,
		"symbol": "USDT",
		"name": "tether",
		"decimals": 6,
		"addresses": [
		],
		"icon": <img src={USDT} className="img-fluid custom-icon" alt="USDT token icon" />,
	}, 
	{
		"id":3,
		"symbol": "USDC",
		"name": "USD Coin",
		"decimals": 6,
		"addresses": [
		],
		"icon": <img src={USDC} className="img-fluid custom-icon" alt="USDC token icon" />,

	}
]

export const currencyInfo = [
	{
		"id":0,
		"symbol": "ETH",
		"name": "eth",
		"icon": <img src={ETH_Currency} className="img-fluid custom-icon" alt="ETH currency icon" />,
	},
	{
		"id":1,
		"symbol": "USD",
		"name": "usd",
		"icon": <img src={USD_Currency} className="img-fluid custom-icon" alt="USD currency icon" />,
	}
]



export const testData = [
	{
		agreementAddress: "0xeF2aeEa8B08784C4C2Aab7943BD807bAeA9C6ed1",
		agreementFileUrl: "",
		agreementName: "A",
		agreementStatus: "Pending",
		brand: "0xCDa3D794F33aDAccEe25d3CDA26977927377e4b4",
		budget: "0.002081902025690671",
		budgetRemaining: "0.002081902025690671",
		influencer: "0x181af5Fc47b5c276BE283B40AFD5A1b0219e8312",
		longCreatedDate: "Fri May 28 2021",
		longEndDate: "Sun May 30 2021",
		mediaLink: "The influencer hasn't uploaded one yet",
		ownerRole: "brand",
		payPerView: "0.001665521620552536",
		shortCreatedDate: "5/28/2021",
		shortEndDate: "5/30/2021",
		tokenDecimals: 18,
		tokenId: 0,
		tokenPaymentAddress: "0x0000000000000000000000000000000000000000",
		usingEth: true,
	},
	{
		agreementAddress: "0xeF2aeEa8B08784C4C2Aab7943BD807bAeA9C6ed1",
		agreementFileUrl: "",
		agreementName: "B",
		agreementStatus: "Pending",
		brand: "0xCDa3D794F33aDAccEe25d3CDA26977927377e4b4",
		budget: "0.002081902025690671",
		budgetRemaining: "0.002081902025690671",
		influencer: "0x181af5Fc47b5c276BE283B40AFD5A1b0219e8312",
		longCreatedDate: "Fri April 28 2021",
		longEndDate: "Sun June 30 2021",
		mediaLink: "The influencer hasn't uploaded one yet",
		ownerRole: "brand",
		payPerView: "0.001665521620552536",
		shortCreatedDate: "4/28/2021",
		shortEndDate: "6/30/2021",
		tokenDecimals: 18,
		tokenId: 0,
		tokenPaymentAddress: "0x0000000000000000000000000000000000000000",
		usingEth: true,
	}
]

export const testDataEmpty = [];

export const agreementStatusNames = [
	{
		"id": 0,
		"name": "Pending"
	}, 
	{
		"id": 1,
		"name": "Accepted"
	}

]

export const agreementStatusInfo = [
	{
		"id": 0,
		"name": "Pending"
	}, 
	{
		"id": 1,
		"name": "Rejected"
	},
	{
		id: 2,
		name: "Active"
	},
	{
		id: 3,
		name: "Completed"
	}
]

export const contractsInfo = [
	{
		chainId: 42, // kovan
		agreementFactory : {
			address: KovanAgreementFactory.address,
			abi: KovanAgreementFactory.abi
		},
		baseAgreement : {
			address: KovanBaseAgreement.address,
			abi: KovanBaseAgreement.abi
		},
		erc20: {
			abi:ERC20.abi
		}
	}
]


export const chainlinkInfo = [
	{
		chainId: 42, // kovan
		linkTokenAddress: "0xa36085F69e2889c224210F603D836748e7dC0088",
		oracleAddress: "0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e",
		jobId: "0x3530666334323135663839343433643138356230363165356437616639343930",
		oracleFee: "100000000000000000",
	}
]

/* eslint-disable no-unused-vars */
export const formStatuses = {
	FORM:0,
	SENT:1,
	ERROR:2,
}
/* eslint-disable no-unused-vars */

