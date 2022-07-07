import React, { useEffect} from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getBoardsFetch } from '../reducers/boardsReducer'
import Dots from './share/icons/Dots'

const Boards: React.FC = () => {

  const boards = useAppSelector((state) => state.boards.boards)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBoardsFetch())
  }, [dispatch])

  if (!boards.length) {
    return (
      <Container>
        <BoardsHeader>You don&apos;t have boards yet</BoardsHeader>
      </Container>
    )
  }

  return (
    <Container>
      <BoardsHeader>My boards</BoardsHeader>
      <Ul>
        {boards.map((board) => (
          <BoardItem key={board._id}>
            <BoardLink color={board.color}>
              <Wrapper>
                <Dots />
              </Wrapper>
              {board.title}
            </BoardLink>
          </BoardItem>
        ))}
      </Ul>
    </Container>
  )
}

export default React.memo(Boards)

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 5px;
  height: 20px;
  width: 20px;
  z-index: 3;
`

const BoardLink = styled.a`
  display: inline-block;
  background-color: ${(props) => props.color};
  width: 200px;
  height: 100px;
  border-radius: 3px;
  color: #fff;
  font-weight: 700;
  padding: 5px;
  cursor: pointer;
  position: relative;
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
const BoardItem = styled.li``

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
`

const BoardsHeader = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  position: relative;
  padding-left: 35px;
`
