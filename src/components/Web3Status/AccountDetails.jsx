import React from "react";
import shallow from 'zustand/shallow';
// component imports
import {Identicon, Modal} from "#components";
// custom imports
import { useProviderStore } from '#hooks';
import {shortenAddress} from "#utils";
import {getChainName} from "#utils/dappFunctions";
import Copy from "./Copy";


export const AccountDetails = (props) => {
	const {id} = props;
	const {account, chainId} = useProviderStore((state) => ({ account: state.account, chainId: state.chainId}), shallow);
	const connectProvider = useProviderStore((state) => state.connectProvider);
	const disconnect = useProviderStore((state) => state.disconnect);

	const chainName = getChainName({"chainId":chainId});
	
	const handleProviderChange = React.useCallback(async () => {
	  try { 
	  	await disconnect();
	    await connectProvider();
	  } catch (err) {
	    console.error(err);
	  } 
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connectProvider]);

	return (
	  <>
	    <Modal id={id} >
	      <Modal.Header  title="Account" />
	      <Modal.Body>
		      	<div className="border border-primary rounded p-3 text-start">
		      		<p>
		      			Connected to {chainName} 
		      			<button className="btn btn-outline-primary float-end btn-sm" data-bs-dismiss="modal" onClick={handleProviderChange}>Change</button>
		      		</p>
		      		<h5>
		      			<Identicon />
		      			<span className="ms-2">{shortenAddress({address:account})}</span>
		      			<p> <Copy toCopy={account}> Copy address </Copy> </p>
		      			
		      		</h5>
		      		
		      	</div>
	      </Modal.Body>
	    </Modal>
		</>
	);
}

export default AccountDetails;