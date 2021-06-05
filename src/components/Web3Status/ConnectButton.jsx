import React, {useState, useCallback} from "react";
// custom imports
import { useProviderStore } from '#hooks';


export const ConnectButton = () => {
	// eslint-disable-next-line
	const [disabled, setDisabled] = useState(false);
	const connectProvider = useProviderStore((state) => state.connectProvider);

	const handleProviderConnect = useCallback(async () => {
	  setDisabled(true);

	  try { 
	    await connectProvider();
	  } catch (err) {
	    console.error(err);
	  } finally {
	    setDisabled(false);
	  }
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connectProvider]);

	return (
		<>
			<button type="button" className="btn btn-primary" onClick={handleProviderConnect}>Connect</button>
		</>
	);
}

export default ConnectButton;