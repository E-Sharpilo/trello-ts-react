// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AddListForm } from '../components/AddListForm'
import { List } from '../components/List'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getBoardsFetch } from '../reducers/boardsReducer'
import { getListsFetch } from '../reducers/listsReducer'
import { selectBoards } from '../selectors/boardsSelector'
import { selectLists } from '../selectors/listsSelector'

type Props = {
  background: string | undefined
}

const Board = () => {
  const boardId = useParams().id
  const lists = useAppSelector(selectLists)
  const board = useAppSelector(selectBoards).find((item) => item._id === boardId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBoardsFetch(null))
    dispatch(getListsFetch(boardId))
  }, [dispatch])

  return (
    <StyledBoard background={board?.color}>
      <Title>{board?.title}</Title>
      <Wrapper>
        {lists.map((item) => (
          <List key={item._id} title={item.title} cards={item.cardsId} />
        ))}
        <AddListForm boardId={boardId}/>
      </Wrapper>
    </StyledBoard>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: start;
`

const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
`

const StyledBoard = styled.div<Props>`
  height: 95vh;
  padding: 0 20px;
  background-color: ${(prop) => (prop.background ? prop.background : 'blue')};
  overflow-x: scroll;
`

export default React.memo(Board)
