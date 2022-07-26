import { useFormik } from 'formik'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../hooks'
import { createCardsFetch } from '../reducers/cards'
import Button from './share/Button'
import { CloseButton } from './share/icons/CloseButton'
import TextareaAutoSize from 'react-textarea-autosize';

type Props = {
  boardId?: string
  listId?: string
}

const CreateCardForm: React.FC<Props> = ({ listId }) => {
  const dispatch = useAppDispatch()

  const [isVisibleInput, setIsVisibleInput] = useState(false)

  const visibleToggle = useCallback(() => {
    setIsVisibleInput(!isVisibleInput)
  }, [isVisibleInput])

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: () => {
      addNewCard()
    },
  })
  const onBlurHandler = useCallback(() => {
    formik.submitForm()
  }, [formik.values])

  const addNewCard = useCallback(() => {
    dispatch(createCardsFetch({ ...formik.values, listId }))
    visibleToggle()
    formik.resetForm()
  }, [dispatch, formik.values])

  return isVisibleInput ? (
    <form onSubmit={formik.handleSubmit}>
      <TextArea
        onChange={formik.handleChange}
        value={formik.values.title}
        id='title'
        name='title'
        placeholder='Enter card title...'
        onBlur={onBlurHandler}
      />
      <Wrapper>
        <StyledShortButton type='submit'>Add Card</StyledShortButton>
        <StyledCloseButton onClick={visibleToggle} />
      </Wrapper>
    </form>
  ) : (
    <StyledLongButton type='button' onClick={visibleToggle}>
      Add Card
    </StyledLongButton>
  )
}

export default React.memo(CreateCardForm)

const TextArea = styled(TextareaAutoSize)`
  border-radius: 3px;
  border: none;
  width: 100%;
  resize: none;
  min-height: 50px;
  overflow-y: hidden;
  box-shadow: 0 1px 0 #091e4240;
  padding: 5px;
  margin-bottom: 10px;
`

const StyledLongButton = styled(Button)`
  min-width: 100%;
  display: flex;
  justify-content: center;
  background-color: #252020;
`

const StyledShortButton = styled(Button)`
  background-color: #252020;
  width: 126px;
  display: flex;
  justify-content: center;
`

const StyledCloseButton = styled(CloseButton)`
  right: 100px;
  background-color: transparent;
`

const Wrapper = styled.div`
  position: relative;
`
