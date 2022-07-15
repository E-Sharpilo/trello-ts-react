import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { CloseButton } from './icons/CloseButton'

type Props = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onClose}/>
      <ModalWindow>
        <CloseButton onClick={onClose}/>
        {children}
      </ModalWindow>
    </>,
    document.getElementById('portal') as HTMLElement,
  )
}

export default React.memo(Modal)

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .7);
  z-index: 1000;
`

const ModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 10px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  z-index: 1001;
`

