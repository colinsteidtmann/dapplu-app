import {Link} from "react-router-dom";


export const ViewAgreementsCard = (props) => {
	const {userAgreement} = props;
    const { agreementAddress, agreementName, shortCreatedDate, shortEndDate } = userAgreement;
    return (
        <div className="card btn text-start mb-3 shadow-sm">
		  <div className="card-body row">
		  	<div className="col-4 col-lg-6">
		  		{agreementName}
		  	</div>
		  	<div className="col-4 col-lg-3 ">
		  		{shortCreatedDate}
		  	</div>
		  	<div className="col-4 col-lg-3 ">
		  		{shortEndDate}
		  		<span className="position-absolute end-5">
		  		<i className="fas fa-chevron-right"></i>
		  		</span>
		  	</div>

		  	<Link className="stretched-link" to={`/agreement/${agreementAddress}`} />
		  </div>
		</div>
    );
}

export default ViewAgreementsCard;