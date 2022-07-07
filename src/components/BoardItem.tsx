import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { TBoard } from '../types/board'
import EdtBoardForm from './EditBoardForm'
import { CloseButton } from './share/CloseButton'
import Dots from './share/icons/Dots'
import { Link } from 'react-router-dom'

type Props = {
  board: TBoard
  key: string
}

const BoardItem: React.FC<Props> = ({ board }) => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false)

  const visibleMenuHandler = useCallback(() => {
    setIsVisibleMenu(!isVisibleMenu)
  }, [isVisibleMenu])

  return isVisibleMenu ? (
    <>
      <Item>
        <BoardLink color={board.color}>
          <Wrapper onClick={visibleMenuHandler}>
            <Dots />
          </Wrapper>
          {board.title}
          <Overlay onClick={visibleMenuHandler}></Overlay>
          <Popup>
            <CloseButton onClick={visibleMenuHandler} />
            <Title>Update Title</Title>
            <EdtBoardForm title={board.title} id={board._id} />
          </Popup>
        </BoardLink>
      </Item>
    </>
  ) : (
    <Item>
      <Link to={`/board/${board._id}`}>
        <BoardLink color={board.color}>
          <Wrapper onClick={visibleMenuHandler}>
            <Dots />
          </Wrapper>
          {board.title}
        </BoardLink>
      </Link>
    </Item>
  )
}

export default React.memo(BoardItem)

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`

const Title = styled.div`
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  line-height: 24px;
  text-align: center;
`

const Popup = styled.div`
  min-width: 200px;
  min-height: 150px;
  padding: 5px;
  position: absolute;
  background-color: #fff;
  right: -150px;
  z-index: 1001;
  top: 20px;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
`

const Item = styled.li``

const BoardLink = styled.div`
  position: relative;
  display: inline-block;
  background-color: ${(props) => props.color};
  width: 200px;
  height: 100px;
  border-radius: 3px;
  color: #fff;
  font-weight: 700;
  padding: 5px;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    left: 0;
    top: 0;
    opacity: 0;
    transition: opacity 0.1s;
  }
  &:hover::after {
    opacity: 1;
  }
`
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 5px;
  height: 20px;
  width: 20px;
  z-index: 3;
`
