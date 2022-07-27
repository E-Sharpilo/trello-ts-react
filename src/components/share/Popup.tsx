import React from 'react';
import styled from 'styled-components';
import { CloseButton } from './icons/CloseButton';

type Props = {
  children?: React.ReactNode;
  onClose?: () => void;
  coords?: {
    top?: string;
    left?: string;
    right?: string;
  };
};

const PopUpWindow: React.FC<Props> = ({ children, onClose, coords }) => {
  return (
    <>
      <Overlay onClick={onClose} />
      <Popup coords={coords}>
        <CloseButton onClick={onClose} />
        {children}
      </Popup>
    </>
  );
};

export default React.memo(PopUpWindow);

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
`;

export const Popup = styled.div<Props>`
  min-width: 200px;
  min-height: 150px;
  padding: 5px;
  position: absolute;
  background-color: #fff;
  left: ${(props) => props.coords?.left || ''};
  top: ${(props) => props.coords?.top || ''};
  right: ${(props) => props.coords?.right || ''};
  border-radius: 3px;
  z-index: 501;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
`;
