import { useEffect } from 'react'
import styled from 'styled-components'
import { getBoards } from '../api/boardsApi'
import { useAppDispatch, useAppSelector } from '../hooks'

export const Boards: React.FC = () => {
  const dispatch = useAppDispatch()
  const boards = useAppSelector((state) => state.boards.boards)

  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch])

  return (
    <StyledContainer>
      <BoardsHeader>My boards</BoardsHeader>
      <div>
        <StyledUl>
          {boards.map((board) => (
            <li key={board._id}>
              <StyledLink color={board.color}>{board.title}</StyledLink>
            </li>
          ))}
          <li>Create board</li>
        </StyledUl>
      </div>
    </StyledContainer>
  )
}
const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin-top: 20px;
`

const StyledLink = styled.a`
  display: inline-block;
  background-color: ${(props) => (props.color)};
  width: 200px;
  height: 100px;
  border-radius: 3px;
  color: #fff;
  font-weight: 700;
  padding: 5px;
  cursor: pointer;
  position: relative;
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    left: 0;
    top: 0;
    opacity: 0;
    transition: opacity 0.1s;
  }
  &:hover::after {
    opacity: 1;
  }
`

const StyledContainer = styled.main`
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
  &::before {
    content: '';
    position: absolute;
    vertical-align: middle;
    left: 0;
    width: 24px;
    height: 24px;
    background-image: url('./images/user.png');
    background-size: cover;
    top: 50%;
    transform: translateY(-50%);
  }
`
