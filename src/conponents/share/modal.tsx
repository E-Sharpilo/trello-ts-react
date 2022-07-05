import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

type Props = {
  isOpen: boolean
  close: () => any
  children?: any
}

export const Modal: React.FC<Props> = ({ children, isOpen, close }) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <>
      <StyledOverlay onClick={close}/>
      <StyledModal>
        <StyledClose onClick={close} />
        {children}
      </StyledModal>
    </>,
    document.querySelector('body') as HTMLElement,
  )
}


const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const StyledModal = styled.div`
  position: absolute;
  top: 50px;
  left: 150px;
  padding: 10px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
`

const StyledClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  font-size: 30px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: #fff;
  transition: color 0.2s ease-out;
  &::after {
    content: '×';
    position: absolute;
    top: -9px;
    right: 5px;
  }
`