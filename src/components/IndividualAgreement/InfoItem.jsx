import MyTooltip from "./MyTooltip";


const InfoItem = ({children}) => {
    return (
        <div className="row mb-3 mx-auto overflow-auto">
        	{children}
			
		</div>
    );
}

const Label = (props) => {
	const {text, children} = props
	return (
		<label>{text}{children}</label>
	);
}

const Tooltip = (props) => {
	const {text, placement} = props;
	return (
		<MyTooltip text={text} placement={placement} />
	);
}

const Body = (props) => {
	const {text, children} = props;
	return (
		<div>
			{children}
			<p className="text-secondary d-inline">{text}</p>

		</div>
	);
}

const Text = (props) => {
	const {children} = props;
	return (
		<p className="text-secondary d-inline">
			{children}
		</p>
	);
}


InfoItem.Label = Label;
InfoItem.Tooltip = Tooltip;
InfoItem.Body = Body;
InfoItem.Body.Text = Text;

export default InfoItem;