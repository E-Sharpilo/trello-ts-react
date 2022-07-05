import { useEffect } from 'react'
import styled from 'styled-components'
import { getBoards } from '../api/boardsApi'
import { getLists } from '../api/listsApi'
import { useAppDispatch, useAppSelector } from '../hooks'
import { List } from './List'

type Props = {
  background?: string
}

export const Board = () => {
  const dispatch = useAppDispatch()
  const boards = useAppSelector((state) => state.boards.boards)
  const lists = useAppSelector((state) => state.lists.lists)

  const board = boards.find((item) => item._id === '62bdbae6776eef4b7f84716f')

  useEffect(() => {
    dispatch(getBoards())
    dispatch(getLists('62bdbae6776eef4b7f84716f'))
  }, [dispatch])

  return (
    <StyledBoard background={board?.color}>
      <StyledTitle>{board?.title}</StyledTitle>
      <StyledWrapper>
        {lists.map((item) => (
          <List key={item._id} title={item.title} cards={item.cardsId} />
        ))}
      </StyledWrapper>
    </StyledBoard>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: start;
`

const StyledTitle = styled.h1`
  color: #fff;
`

const StyledBoard = styled.div<Props>`
  height: 100vh;
  padding: 0 20px;
  background-color: ${(prop) => prop.background};
`