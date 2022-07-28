import React from 'react';
import styled from 'styled-components';

type Props = {
  children: string;
};

const ErrorMessage: React.FC<Props> = ({ children }) => {
  return <Message>{children}</Message>;
};
export default React.memo(ErrorMessage);

const Message = styled.div`
  width: 300px;
  padding: 10px;
  background-color:#ffe4e4;
  color: #c63e3d;
  border-radius: 3px;
  border: 1px solid #c63e3d;
  margin-top: 20px;
`
