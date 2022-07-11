import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from './share/Button'
import CreateBoardForm from './CreateBoardForm'
import Modal from './share/Modal'
import { url } from '../constants/urlConstants'

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  return (
    <StyledHeader>
      <Nav>
        <Link to={url.MAIN_PATH}>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </Link>
        <Button arrow type='button'>
          My boards
        </Button>
        <Button type='button' onClick={toggleModal} background='#014a75'>
          Create
        </Button>
      </Nav>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <CreateBoardForm onClose={toggleModal}/>
      </Modal>
    </StyledHeader>
  )
}

export default React.memo(Header)

const StyledHeader = styled.header`
  background-color: #026aa7;
  display: flex;
  align-items: center;
  width: 100%;
  height: 5vh;
  padding: 6px 25px;
  position: sticky;
`
const Nav = styled.nav`
  display: flex;
  gap: 10px;
`
const LogoWrapper = styled.div`
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
