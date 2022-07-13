import React from 'react'
import { useAppSelector } from '../hooks'
import { selectBoards } from '../selectors/boards'
import { Link } from 'react-router-dom'
import { url } from '../constants/urlConstants'
import styled from 'styled-components'

type StyleProps = {
  backgroundColor: string
}

const BoardsList = () => {
  const boards = useAppSelector(selectBoards)

  return (
    <Root>
      {boards.map((board) => (
        <StyledLink key={board._id} to={`${url.BOARD_PATH}/${board._id}`}>
          <BoardItem>
            <BoardColor backgroundColor={board.color} />
            <div>{board.title}</div>
          </BoardItem>
        </StyledLink>
      ))}
    </Root>
  )
}

export default React.memo(BoardsList)

const StyledLink = styled(Link)`
  text-decoration: none;
`
const Root = styled.ul`
  display: flex;
  flex-direction: column;
`
const BoardColor = styled.div<StyleProps>`
  height: 30px;
  width: 60px;
  border-radius: 3px;
  background-color: ${(props) => props.backgroundColor};
`
const BoardItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;
  vertical-align: middle;
  margin-top: 10px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid black;
`