import React, { useEffect, useRef } from 'react'
// package imports
import styled from 'styled-components'
import Jazzicon from 'jazzicon'
// custom imports
import { useProviderStore } from '#hooks';

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  display:inline;
  vertical-align: middle;
`;

export const Identicon = () => {
  const ref = useRef();

  const account = useProviderStore((state) => state.account);

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  }, [account]);

  return <StyledIdenticon ref={ref} />;
}

export default Identicon;