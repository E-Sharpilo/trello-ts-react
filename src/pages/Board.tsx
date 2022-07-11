// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AddListForm } from '../components/CreateListForm'
import { List } from '../components/List'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getBoardsFetch, updateBoardsFetch } from '../reducers/boards'
import { getListsFetch } from '../reducers/lists'
import { selectBoards } from '../selectors/boardsSelector'
import { selectLists } from '../selectors/listsSelector'
import { useFormik } from 'formik'

type Props = {
  background: string | undefined
}

type DisplayProps = {
  isEditing: boolean
}

const Board = () => {
  const boardId = useParams().id
  const lists = useAppSelector(selectLists)
  const boards = useAppSelector(selectBoards)

  const board = useMemo(() => {
    if (!boards) {
      return
    }

    return boards.find((item) => item._id === boardId)
  }, [boards, boardId])

  useEffect(() => {
    if (board) {
      formik.values.title = board.title
    }
  })

  const dispatch = useAppDispatch()

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    dispatch(getBoardsFetch(null))
    dispatch(getListsFetch(boardId))
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      title: '',
      id: boardId,
    },
    onSubmit: () => {
      updateTitle()
      setIsEditing(false)
    },
  })

  const updateTitle = useCallback(() => {
    dispatch(updateBoardsFetch(formik.values))
  }, [dispatch, formik.values])

  return (
    <StyledBoard background={board?.color}>
      <Container>
        <Title
          isEditing={isEditing}
          onDoubleClick={() => {
            setIsEditing(true)
          }}
        >
          {board?.title}
        </Title>
        <form onSubmit={formik.handleSubmit}>
          <Input
            isEditing={isEditing}
            onChange={formik.handleChange}
            value={formik.values.title}
            type='text'
            id='title'
            name='title'
            onBlur={() => {
              updateTitle()
              setIsEditing(false)
            }}
          />
        </form>
      </Container>
      <Wrapper>
        {lists.map((item) => (
          <List key={item._id} {...item} />
        ))}
        <AddListForm boardId={boardId} />
      </Wrapper>
    </StyledBoard>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: start;
`

const Title = styled.h1<DisplayProps>`
  display: ${(prop) => (prop.isEditing ? 'none' : 'block')};
  color: #fff;
`

const Input = styled.input<DisplayProps>`
  display: ${(prop) => (prop.isEditing ? 'block' : 'none')};
`

const Container = styled.div`
  margin-bottom: 20px;
`

const StyledBoard = styled.div<Props>`
  height: 95vh;
  padding: 0 20px;
  background-color: ${(prop) => (prop.background ? prop.background : 'blue')};
  overflow-x: auto;
`

export default React.memo(Board)
