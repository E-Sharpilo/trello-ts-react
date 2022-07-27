import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
};

export default React.memo(Loader);

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #383636; /* Black */
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;
`;
