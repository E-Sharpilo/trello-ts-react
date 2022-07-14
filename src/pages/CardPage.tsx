import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CloseButton } from '../components/share/CloseButton'
import ConfirmWindow from '../components/share/ConfirmWindow'
import Trash from '../components/share/icons/Trash'
import Modal from '../components/share/Modal'
import { ROUTES } from '../constants/urlConstants'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getBoardsFetch } from '../reducers/boards'
import { deleteCardFetch, getCardFetch, updateCardFetch } from '../reducers/card'
import { selectCard } from '../selectors/card'
import { validate } from '../utils/validateForms'


export const CardPage: React.FC = () => {
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const boardId = useParams().idb
  const cardId = useParams().idc
  const dispatch = useAppDispatch()
  const card = useAppSelector(selectCard)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBoardsFetch(null))
  }, [dispatch])

  useEffect(() => {
    dispatch(getCardFetch(cardId))
  }, [dispatch, cardId])

  useEffect(() => {
    if (card) {
      formik.values.title = card.title
    }
  }, [card])

  const formik = useFormik({
    initialValues: {
      title: card.title,
    },
    validate,
    onSubmit: () => {
      updateTitle()
    },
  })

  const doubleClickHandler = useCallback(() => {
    setIsTitleEditing(true)
  }, [isTitleEditing])

  const onBlurHandler = useCallback(() => {
    formik.submitForm()
  }, [formik.values])

  const updateTitle = useCallback(() => {
    dispatch(updateCardFetch({ ...formik.values, id: cardId }))
    setIsTitleEditing(false)
  }, [dispatch, formik.values])

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  const deleteCard = useCallback(() => {
    dispatch(deleteCardFetch(cardId))
    navigate(`${ROUTES.BOARD_PATH}/${boardId}`)
  }, [dispatch, cardId])

  return (
    <Container>
      <Link to={`${ROUTES.BOARD_PATH}/${boardId}`}>
        <CloseButton />
      </Link>
      {isTitleEditing ? (
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
        <Title onDoubleClick={doubleClickHandler}>{card.title}</Title>
      )}

      <Wrapper>
        <Trash onClick={toggleModal} />
      </Wrapper>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ConfirmWindow deleteCard={deleteCard} onClose={toggleModal} />
      </Modal>
    </Container>
  )
}

export default React.memo(CardPage)

const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
`

const Title = styled.div`
  padding: 5px;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`

const Container = styled.div`
  position: relative;
  border-radius: 3px;
  padding: 15px;
  margin: auto;
  margin-top: 50px;
  min-height: 800px;
  width: 100%;
  max-width: 768px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; ;
`

const Input = styled.input`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  padding: 5px;
`