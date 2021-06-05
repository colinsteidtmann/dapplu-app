import React from "react";
import {Link} from "react-router-dom";

export const BackButton = (props) => {
  const {to} = props;
  return (
  	<div className="container-fluid row gx-1 gx-sm-4">
	   	<Link to={to}>
	      <button type="button" className="btn float-start">
	        <i className="fas fa-chevron-left"></i> Back
	      </button>
	    </Link>
    </div>
  );
};

export default BackButton