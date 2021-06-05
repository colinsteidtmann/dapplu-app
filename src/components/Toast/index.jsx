import React from "react";
import Toast from "react-bootstrap/Toast";

const MyToast = (props) => {
	const {title, body, time, style, show, toggleShow} = props
	return (
		<Toast
		  style={style || {
		    position: 'fixed',
		    bottom: 10,
		    right: 10,
		  }}
		  show={show}
		  onClose={toggleShow}
		  animation={false}
		>
		  <Toast.Header closeButton={false}>
		    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
		    <strong className="me-auto">{title}</strong>
		    <small>{time || "just now"}</small>
		    <button type="button" className="btn-close" onClick={toggleShow} ></button>
		  </Toast.Header>
		  <Toast.Body>
		  	{body}
		  </Toast.Body>
		</Toast>
	);
}

export default MyToast;