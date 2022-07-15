import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from './share/Button'
import CreateBoardForm from './CreateBoardForm'
import Modal from './share/Modal'
import { ROUTES } from '../constants/urlConstants'
import { CloseButton } from './share/icons/CloseButton'
import BoardsList from './BoardList'

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisiblePopup, setIsVisiblePopup] = useState(false)

  const togglePopup = useCallback(() => {
    setIsVisiblePopup(!isVisiblePopup)
  }, [isVisiblePopup])

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  return (
    <StyledHeader>
      <Nav>
        <Link to={ROUTES.MAIN_PATH}>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </Link>
        <Button arrow type='button' onClick={togglePopup}>
          My boards
        </Button>
        {isVisiblePopup && (
          <>
            <Overlay onClick={togglePopup}></Overlay>
            <Popup>
              <CloseButton onClick={togglePopup} />
              <Title>My Boards</Title>
              <BoardsList />
            </Popup>
          </>
        )}
        <Button type='button' onClick={toggleModal} background='#014a75'>
          Create
        </Button>
      </Nav>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <CreateBoardForm onClose={toggleModal} />
      </Modal>
    </StyledHeader>
  )
}

export default React.memo(Header)

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Popup = styled.div`
  min-width: 200px;
  min-height: 150px;
  padding: 5px;
  position: absolute;
  background-color: #fff;
  left: 50px;
  top: 5.5vh;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
`

const Title = styled.div`
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  line-height: 28px;
  font-weight: 700;
  text-align: center;
`

const StyledHeader = styled.header`
  background-color: #026aa7;
  display: flex;
  align-items: center;
  width: 100%;
  height: 5vh;
  padding: 6px 25px;
  position: sticky;
  z-index: 10;
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
