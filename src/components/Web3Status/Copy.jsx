import React from 'react'
import styled from 'styled-components'
// custom imports
import {useCopyClipboard} from "#hooks";

const CopyIcon = styled.a`
  flex-shrink: 0;
  color: rgb(136, 141, 155);
  font-size:0.825rem;
  margin-right: 1rem;
  margin-left: 0.5rem;
  text-decoration: none;
  cursor:pointer;
  :hover,
  :active,
  :focus {
    color:rgb(136, 141, 155);
  }
`

export const Copy = (props) => {
	const [isCopied, setCopied] = useCopyClipboard()
	return (
		<CopyIcon onClick={() => setCopied(props.toCopy)}>
			{ 
				isCopied ? (
					<>
						<i className="far fa-check-circle"></i>
						<span> Copied</span>
					</>
				) : (
					<i className="far fa-clipboard"></i>
				)
			}
			{isCopied ? '' : props.children}
		</CopyIcon>
	);
}

export default Copy;
