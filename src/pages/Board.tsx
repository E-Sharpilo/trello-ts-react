import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import AddListForm from '../components/CreateListForm'
import List from '../components/List'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getBoardsFetch, updateBoardsFetch } from '../reducers/boards'
import { getListsFetch } from '../reducers/lists'
import { selectBoards } from '../selectors/boards'
import { selectLists } from '../selectors/lists'
import { useFormik } from 'formik'
import { validate } from '../utils/validateForms'
import { getTagsFetch } from '../reducers/tags'
import Loader from '../components/share/Loader'

type Props = {
  background: string | undefined
}

const Board = () => {
  const boardId = useParams().idb
  const lists = useAppSelector(selectLists)
  const {boards, loading} = useAppSelector(selectBoards)

  const board = useMemo(() => {
    if (!boards) {
      return
    }

    return boards.find((item) => item._id === boardId)
  }, [boards, boardId])

  const dispatch = useAppDispatch()

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    dispatch(getTagsFetch(null))
  }, [dispatch])

  useEffect(() => {
    dispatch(getBoardsFetch(null))
  }, [dispatch])

  useEffect(() => {
    dispatch(getListsFetch(boardId))
  }, [dispatch, boardId])

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validate,
    onSubmit: () => {
      updateTitle()
    },
  })

  useEffect(() => {
    if (board) {
      formik.values.title = board.title
    }
  }, [board])

  const onBlurHandler = useCallback(() => {
    formik.submitForm()
  }, [formik.values])

  const doubleClickHandler = useCallback(() => {
    setIsEditing(true)
  }, [isEditing])

  const updateTitle = useCallback(() => {
    dispatch(updateBoardsFetch({ ...formik.values, id: boardId }))
    setIsEditing(false)
  }, [dispatch, formik.values])

  if (loading) {
    return <Loader />
  }

  return (
    <StyledBoard background={board?.color}>
      <Container>
        {isEditing ? (
          <form onSubmit={formik.handleSubmit}>
            <Input
              onChange={formik.handleChange}
              value={formik.values.title}
              type='text'
              id='title'
              name='title'
              onBlur={onBlurHandler}
            />
          </form>
        ) : (
          <Title onDoubleClick={doubleClickHandler}>{board?.title}</Title>
        )}
      </Container>
      <Wrapper>
        {lists.map((item) => (
          <List key={item._id} title={item.title} _id={item._id} boardId={boardId} />
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

const Title = styled.div`
  font-size: 22px;
  padding: 5px;
  font-weight: 800;
  color: #fff;
`
const Container = styled.div`
  padding-top: 10px;
  margin-bottom: 20px;
`

const StyledBoard = styled.div<Props>`
  height: 95vh;
  padding: 0 20px;
  background-color: ${(prop) => (prop.background ? prop.background : 'blue')};
  overflow-x: auto;
`

const Input = styled.input`
  font-size: 22px;
  padding: 5px;
  font-weight: 800;
`

export default React.memo(Board)
