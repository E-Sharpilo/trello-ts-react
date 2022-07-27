import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from './share/Button'
import CreateBoardForm from './CreateBoardForm'
import Modal from './share/Modal'
import { ROUTES } from '../constants/urlConstants'
import BoardsList from './BoardList'
import { useAppSelector } from '../hooks'
import { selectUser } from '../selectors/user'
import User from './User'
import Popup from './share/Popup'

const Header: React.FC = () => {
  const { isAuth } = useAppSelector(selectUser)
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
            <Popup onClose={togglePopup} coords={{top: '5.5vh', left: '50px'}}>
              <Title>My Boards</Title>
              <BoardsList onClose={togglePopup} />
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
      {isAuth && <User />}
    </StyledHeader>
  )
}

export default React.memo(Header)

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
  justify-content: space-between;
  width: 100%;
  height: 5vh;
  padding: 6px 25px;
  position: sticky;
  z-index: 10;
`
const Nav = styled.nav`
  display: flex;
  gap: 10px;
  width: 100%;
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
