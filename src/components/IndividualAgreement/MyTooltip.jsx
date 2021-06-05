import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

export const MyTooltip = (props) => {
	const {text, placement} = props;	
	return (
		<>
		<OverlayTrigger
		  key={placement}
		  placement={placement}
		  overlay={
		    <Tooltip 
		    	id={`tooltip-${placement}`}

		    >
		      {text}
		    </Tooltip>
		  }

		>
		  <i className="far fa-question-circle mx-1"></i>
		</OverlayTrigger>
		</>
	);
}

export default MyTooltip