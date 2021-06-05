import {isStringEmpty} from "#utils";

// The url to the written agreement can be valid or empty, here we handle both cases
export const WrittenAgreementLink = (props) => {
    const {url} = props;

    if (isStringEmpty({input:url})) {
        return "The brand didn't upload one"
    } else {
        return (
            <a
	 		  target="_blank"
	 		  rel="noopener noreferrer"
	 		  href={url}
	 		>
	 		  View written agreement <i className="fas fa-external-link-alt"></i>
	 		</a>
        );
    }
}

export default WrittenAgreementLink