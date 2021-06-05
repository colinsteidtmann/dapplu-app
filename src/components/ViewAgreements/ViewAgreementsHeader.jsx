import {useEffect} from "react";
import { isTrue } from "#utils";


const SortButton = (props) => {
    const { id, sortId, setSortId, isAscending, setIsAscending } = props;
    // set button text    
    let buttonText;
    if (id === "agreementName" ) { // Agreement name sort
        buttonText = (isTrue({input:isAscending}) && id === sortId) ? "A-Z" : "Z-A";
    } else if  (id === "shortCreatedDate") { // Created date sort
        buttonText = (isTrue({input:isAscending}) && id === sortId) ? "Old" : "New";
    } else if  (id === "shortEndDate" ) { // End date sort
    	buttonText = (isTrue({input:isAscending}) && id === sortId) ? "Close" : "Far";
    }
    // sortId is the active button. If a button's active, make it primary colored
    const baseClass = " btn btn-sm d-block d-lg-inline-block mx-auto ms-lg-3 mt-2 mt-lg-0 "
    const buttonClass = (sortId === id) ? "btn-primary" + baseClass  : "btn-outline-primary" + baseClass;
    
    return (
    	<button type="button" className={buttonClass} onClick={() => {
    		setIsAscending(!isAscending); 
    		setSortId(id);
    	}}>{buttonText}</button>
    );


}

export const ViewAgreementsHeader = (props) => {
	const {setSortId, setIsAscending } = props;
    useEffect(() => {
        setSortId("agreementName"); // default A-Z sorting
        setIsAscending(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="card bg-light text-start border-0">
		  <div className="card-body text-center text-lg-start row">
		  	<div className="col-4 col-lg-6">
		  		Agreement name
		  		<SortButton id="agreementName" {...props} />
		  	</div>
		  	<div className="col-4 col-lg-3 ">
		  		Date Created
		  		<SortButton id="shortCreatedDate" {...props} />
		  	</div>
		  	<div className="col-4 col-lg-3 ">
		  		Date Expires
		  		<SortButton id="shortEndDate"  {...props} />
		  	</div>
		  </div>
		</div>
    );
}

export default ViewAgreementsHeader;