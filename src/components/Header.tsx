import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './share/Button'
import CreateBoardForm from './CreateBoardForm'
import Modal from './share/Modal'


const Header: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const clickHandler = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <StyledHeader>
      <Nav>
        <LogoLink href='/#'>
          <Logo />
        </LogoLink>
        <Button arrow type='button'>My boards</Button>
        <Button type='button' onClick={clickHandler} darkblue>
          Create
        </Button>
      </Nav>
      <Modal isOpen={modalOpen} onClose={clickHandler}>
        <CreateBoardForm />
      </Modal>
    </StyledHeader>
  )
}

export default React.memo(Header)

const StyledHeader = styled.header`
  background-color: #026aa7;
  width: 100%;
  height: 44px;
  padding: 6px 25px;
  position: sticky;
`
const Nav = styled.nav`
  display: flex;
  gap: 10px;
`
const LogoLink = styled.a`
  padding: 0 6px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #4e97c2;
  }
`

const Logo = styled.div`
  height: 32px;
  width: 75px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url('./images/logo.gif');
  &:hover {
    background-image: url('./images/logo-a.gif');
  }
`
