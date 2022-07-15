import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import CardDescription from '../components/CardDescription'
import Button from '../components/share/Button'
import { CloseButton } from '../components/share/icons/CloseButton'
import ConfirmWindow from '../components/share/ConfirmWindow'
import Trash from '../components/share/icons/Trash'
import Modal from '../components/share/Modal'
import TagsPicker from '../components/TagsPicker'
import { ROUTES } from '../constants/urlConstants'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getBoardsFetch } from '../reducers/boards'
import { deleteCardFetch, getCardFetch, updateCardFetch } from '../reducers/card'
import { selectCard } from '../selectors/card'
import { validate } from '../utils/validateForms'

export const CardPage: React.FC = () => {
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
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

  const togglePopup = useCallback(() => {
    setIsPopupOpen(!isPopupOpen)
  }, [isPopupOpen])

  const deleteCard = useCallback(() => {
    dispatch(deleteCardFetch(cardId))
    navigate(`${ROUTES.BOARD_PATH}/${boardId}`)
  }, [dispatch, cardId])

  return (
    <Container>
      <Link to={`${ROUTES.BOARD_PATH}/${boardId}`}>
        <CloseButton />
      </Link>
      <TagsButton type='button' background='#0079bf' onClick={togglePopup}>
        Tags
      </TagsButton>
      {isPopupOpen && (
        <>
          <Overlay onClick={togglePopup}/>
          <Popup>
            <TagsPicker onClose={togglePopup}/>
          </Popup>
        </>
      )}
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
      <div>Tags</div>

      <CardDescription />

      <Wrapper>
        <Trash onClick={toggleModal} />
      </Wrapper>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ConfirmWindow
          onDelete={deleteCard}
          onClose={toggleModal}
          title={'Are you sure you want to delete this item?'}
          text={
            'You don\'t have previous to restore. This item would be deleted, are you sure you want to continue'
          }
        />
      </Modal>
    </Container>
  )
}

export default React.memo(CardPage)

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`
const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
`

const Popup = styled.div`
  width: 254px;
  min-height: 150px;
  padding: 5px;
  position: absolute;
  background-color: #fff;
  right: -250px;
  z-index: 1001;
  top: 20px;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
`

const TagsButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 40px;
`

const Title = styled.div`
  padding: 5px;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  max-width: 70%;
`

const Container = styled.div`
  position: relative;
  border-radius: 3px;
  padding: 20px;
  padding-left: 40px;
  margin: auto;
  margin-top: 50px;
  min-height: 800px;
  width: 100%;
  max-width: 768px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; ;
`

const Input = styled.input`
 position: relative;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  padding: 5px;
`
