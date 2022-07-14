import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import CardItem from './CardItem'
import { selectCards } from '../selectors/cards'
import CreateCardForm from './CreateCardForm'
import React, { useCallback, useEffect, useState } from 'react'
import { getCardsFetch } from '../reducers/cards'
import { validate } from '../utils/validateForms'
import { useFormik } from 'formik'
import { deleteListsFetch, updateListsFetch } from '../reducers/lists'
import Trash from './share/icons/Trash'
import Modal from './share/Modal'
import ConfirmWindow from './share/ConfirmWindow'

type Props = {
  title: string
  _id: string
  boardId?: string
}

const List: React.FC<Props> = ({ title, _id, boardId }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const cards = useAppSelector(selectCards)
  const cardsByList = cards.filter((item) => item.listId === _id)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCardsFetch(_id))
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      title,
    },
    validate,
    onSubmit: () => {
      updateTitle()
    },
  })

  const doubleClickHandler = useCallback(() => {
    setIsEditing(true)
  }, [isEditing])

  const onBlurHandler = useCallback(() => {
    formik.submitForm()
  }, [formik.values])

  const updateTitle = useCallback(() => {
    dispatch(updateListsFetch({...formik.values, id: _id}))
    setIsEditing(false)
  }, [dispatch, formik.values])

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  const deleteList = useCallback(() => {
    dispatch(deleteListsFetch(_id))
    toggleModal()
  }, [dispatch])

  return (
    <Root>
      {isEditing ? (
        <form onSubmit={formik.handleSubmit}>
          <input
            onChange={formik.handleChange}
            value={formik.values.title}
            type='text'
            id='title'
            name='title'
            onBlur={onBlurHandler}
          />
        </form>
      ) : (
        <Title onDoubleClick={doubleClickHandler}>{title}</Title>
      )}
      <Wrapper>
        <Trash onClick={toggleModal} />
      </Wrapper>
      <CardList>
        {cardsByList.map((item) => (
          <CardItem key={item._id} {...item} boardId={boardId}/>
        ))}
      </CardList>
      <CreateCardForm listId={_id} />
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ConfirmWindow deleteList={deleteList} onClose={toggleModal}/>
      </Modal>
    </Root>
  )
}

export default React.memo(List)

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
`

const Root = styled.div`
  position: relative;
  background-color: #ebecf0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 100%;
  border-radius: 3px;
  padding: 8px;
  width: 100%;
  max-width: 272px;
`

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%;
`

const Title = styled.h2`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`
