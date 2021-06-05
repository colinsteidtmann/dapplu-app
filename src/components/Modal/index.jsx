import React from "react";

const Modal = (props) => {
  const {id, children} = props;
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={id} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

const Header = (props) => {
  const {title, children} = props;
  return (
    <div className="modal-header">
      <h5 className="modal-title" >{title}{children}</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
  );
}

const Body = (props) => {
  const {text, children} = props;
  return (
    <div className="modal-body">
      {text}{children}
    </div>
  );
}

const Footer = (props) => {
  const {close, children} = props;
  return (
    <div className="modal-footer">
      {close && <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>}
      {children}
      }
    </div>
  );
} 

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;

