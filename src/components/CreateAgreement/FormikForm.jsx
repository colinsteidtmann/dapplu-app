import React from "react";
// react-bootstrap imports
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// other imports
import { Formik } from "formik";
import * as yup from "yup";
// component imports
import FileInput from "./FileInput";
import TokenPaymentOption from "./TokenPaymentOption";
// custom imports
import { useLocalStorage } from "#hooks";
import { isAddress } from "#utils";
import { getCurrencyIconAndSymbol } from "#utils/dappFunctions";


// Validation
const schema = yup.object().shape({
    agreementName: yup.string().min(1).max(40, "Invalid name. Must be less than 40 characters.").required(),
    brandAddress: yup.mixed().test("isEthereumAddress", "Invalid ethereum address", value => isAddress({value:value})).required(),
    influencerAddress: yup.mixed().test("isEthereumAddress", "Invalid ethereum address", value => isAddress({value:value})).required(),
    endDate: yup.date().min(new Date(), "Invalid date.").required(),
    payPerView: yup.number().min(0, "Must be greater than 0.").required(),
    budget: yup.number().min(0, "Must be greater than 0.").moreThan(yup.ref("payPerView"), "Must be greater than the pay per view amount.").required(),
    agreementFile: yup.mixed().test("fileSize", "File size too large. Must be less than 160 MB", value => value ? value.file.size <= (160 * 1e+6) : true),
});

export const FormikForm = (props) => {
    const userCurrency = useLocalStorage(state => state.userCurrency);
    const {handleSubmit, loadingState} = props;

    return (
        <Formik
			validationSchema={schema}
			onSubmit={values => handleSubmit(values)}
			initialValues={{
				agreementName: "",
				brandAddress:"",
				influencerAddress:"",
				endDate:"",
				payPerView:"",
				budget:"",
				agreementFile:"",
				tokenPaymentOption:0,
			}}
		>
			{({
				handleSubmit, 
				handleChange,
				handleBlur, 
				values,
				touched, 
				isValid, 
				errors,
				setFieldValue
				}) => (
	        		<Form noValidate onSubmit={handleSubmit} >

	        		  <Form.Group className="mb-3 text-start" controlId="agreementName">
	        		    <Form.Label>Agreement Name</Form.Label>
	        		    <Form.Control 
	        		    	type="text"
	        		    	name="agreementName"
	        		    	value={values.agreementName}
	        		    	onChange={handleChange}
	        		    	onBlur={handleBlur}
	        		    	isValid={touched.agreementName && !errors.agreementName}
	        		    	isInvalid={touched.agreementName && !!errors.agreementName}
						/>
						<Form.Control.Feedback type="invalid">
						  {errors.agreementName}
						</Form.Control.Feedback>
	        		    <Form.Text className="text-muted">
	        		      Give a name for this agreement.
	        		    </Form.Text>
	        		  </Form.Group>

	          		  <Form.Group className="mb-3 text-start" controlId="brandAddress">
	          		    <Form.Label>Brand Address</Form.Label>
	          		    <Form.Control 
	          		    	type="text"
	          		    	name="brandAddress"
	          		    	value={values.brandAddress}
	          		    	onChange={handleChange}
	          		    	onBlur={handleBlur}
	          		    	isValid={touched.brandAddress && !errors.brandAddress}
	          		    	isInvalid={touched.brandAddress && !!errors.brandAddress}
	  					/>
	  					<Form.Control.Feedback type="invalid">
	  					  {errors.brandAddress}
	  					</Form.Control.Feedback>
	          		    <Form.Text className="text-muted">
	          		      Enter the brand's ethereum address. 
	          		    </Form.Text>
	          		  </Form.Group>

	          		  <Form.Group className="mb-3 text-start" controlId="influencerAddress">
	          		    <Form.Label>Influencer Address</Form.Label>
	          		    <Form.Control 
	          		    	type="text"
	          		    	name="influencerAddress"
	          		    	value={values.influencerAddress}
	          		    	onChange={handleChange}
	          		    	onBlur={handleBlur}
	          		    	isValid={touched.influencerAddress && !errors.influencerAddress}
	          		    	isInvalid={touched.influencerAddress && !!errors.influencerAddress}
	  					/>
	  					<Form.Control.Feedback type="invalid">
	  					  {errors.influencerAddress}
	  					</Form.Control.Feedback>
	          		    <Form.Text className="text-muted">
	          		      Enter the content creator/influencer's ethereum address.
	          		    </Form.Text>
	          		  </Form.Group> 

	          		  <Form.Group className="mb-3 text-start" controlId="endDate">
	          		    <Form.Label>End Date</Form.Label>
	          		    <Form.Control 
	          		    	type="datetime-local"
	          		    	name="endDate"
	          		    	value={values.endDate}
	          		    	onChange={handleChange}
	          		    	onBlur={handleBlur}
	          		    	isValid={touched.endDate && !errors.endDate}
	          		    	isInvalid={touched.endDate && !!errors.endDate}
	  					/>
	  					<Form.Control.Feedback type="invalid">
	  					  {errors.endDate}
	  					</Form.Control.Feedback>
	          		    <Form.Text className="text-muted">
	          		      Enter a date after today. This is when the contract expires and stops automatically paying the creator.
	          		    </Form.Text>
	          		  </Form.Group> 

	          		  <Form.Group className="mb-3 text-start" controlId="endDate">
	          		    <Form.Label>Pay Per View</Form.Label>
	          		    <InputGroup>
	          		      <InputGroup.Prepend className="bg-transparent">
	          		        <InputGroup.Text className="bg-transparent" id="basic-addon1">{getCurrencyIconAndSymbol({currencyId: userCurrency})}</InputGroup.Text>
	          		      </InputGroup.Prepend>
	            		    <Form.Control 
	            		    	type="text"
	            		    	name="payPerView"
	            		    	value={values.payPerView}
	            		    	onChange={handleChange}
	            		    	onBlur={handleBlur}
	            		    	isValid={touched.payPerView && !errors.payPerView}
	            		    	isInvalid={touched.payPerView && !!errors.payPerView}
	    					/>
	          		    </InputGroup>
	  					<Form.Control.Feedback type="invalid">
	  					  {errors.payPerView}
	  					</Form.Control.Feedback>
	          		    <Form.Text className="text-muted">
	          		      Enter the amount the brand will pay video view.
	          		    </Form.Text>
	          		  </Form.Group>


	          		  <Form.Group className="mb-3 text-start" controlId="endDate">
	          		    <Form.Label>Budget</Form.Label>
	          		    <InputGroup>
	          		      <InputGroup.Prepend className="bg-transparent">
	          		        <InputGroup.Text className="bg-transparent" id="basic-addon1">{getCurrencyIconAndSymbol({currencyId:userCurrency})}</InputGroup.Text>
	          		      </InputGroup.Prepend>
	              		    <Form.Control 
	              		    	type="text"
	              		    	name="budget"
	              		    	value={values.budget}
	              		    	onChange={handleChange}
	              		    	onBlur={handleBlur}
	              		    	isValid={touched.budget && !errors.budget}
	              		    	isInvalid={touched.budget && !!errors.budget}
	      					/>
	          		    </InputGroup>
	  					<Form.Control.Feedback type="invalid">
	  					  {errors.budget}
	  					</Form.Control.Feedback>
	          		    <Form.Text className="text-muted">
	          		    	Enter the max amount the brand is willing to spend.
	          		    </Form.Text>
	          		  </Form.Group> 


	          		  <Form.Group className="mb-3 text-start" controlId="agreementFile">
	          		    <Form.Label>Written Agreement <small>(optional)</small></Form.Label>
	  					<FileInput name="agreementFile" />
	  					<Form.Control.Feedback type="invalid" className="is-invalid" style={errors.agreementFile && {"display":"block"}}>
	  					  {errors.agreementFile}
	  					</Form.Control.Feedback>      
	          		    <Form.Text className="text-muted">
	          		    	Enter an optional legal contract that the brand and content creator have signed. 
	          		    </Form.Text>
	          		  </Form.Group> 

	          		  <Form.Group className="mb-3 text-start" controlId="tokenPaymentOption">
	          		    <Form.Label>Currency You'll Pay With</Form.Label>
	          		    <TokenPaymentOption id="tokenPaymentOption" values={values} />
	          		    <Form.Text className="text-muted">
	          		    	Select the currency that the brand will pay with and the contract's funds will be stored in. 
	          		    </Form.Text>
	          		  </Form.Group>

	          		  <button type="submit" className="btn btn-primary mt-5">
	          		  	{
	          		  		(loadingState) ?
	          		  		<> 
	          		  			<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
	          		  			Wait...
	          		  		</>
	          		  		:
	          		  		<>
	          		  			Propose
	          		  		</>
	          		  	}
	          		  </button> 

	        		</Form>
	        		
				)}	
		</Formik>
    );
}

export default FormikForm;