import React, {useState, useEffect} from "react";
import {Field, useField} from "formik";



const UploadField = ({ ...props }) => {
  return (
    <>
      <Field
        className="form-control"
        name="inputFile"
        type="file"

        {...props}
      />
    </>
  );
};

const FileInput = (props) => {
	/* eslint-disable no-unused-vars */
	const [field, meta, helpers] = useField(props);
	/* eslint-disable no-unused-vars */
	const {value} = field;

	const {setValue} = helpers;
	const [file, setFile] = useState(value.file);

	const _onChange = (e) => {
	  if (!e.target || !e.target.files) {
	    return;
	  }
	  const file = e.target.files[0];
	  setFile(file);
	};

	useEffect(() => {
	  if (file ) {
	    setValue({ file: file });
	  }
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	return (
		<>
			<Field component={UploadField} 
				   onChange={_onChange} 	  		          		    	
			/>
	  	</>

	);
}

export default FileInput;