import { FormikErrors, useFormik } from 'formik'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { createListsFetch } from '../reducers/lists'
import Button from './share/Button'
import { CloseButton } from './share/CloseButton'

type Props = {
  boardId?: string
}

type FormValues = {
  title: string
}

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {}

  if (!values.title) {
    errors.title = 'Required'
  }

  return errors
}

const AddListForm: React.FC<Props> = ({ boardId }) => {
  const [isVisibleInput, setIsVisibleInput] = useState(false)

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      title: '',
      boardId: boardId,
    },
    validate,
    onSubmit: () => {
      addNewList()
    },
  })

  const addNewList = useCallback(() => {
    dispatch(createListsFetch(formik.values))
    formik.values.title = ''
    handleClick()
  }, [dispatch, formik.values])

  const handleClick = useCallback(() => {
    setIsVisibleInput(!isVisibleInput)
  }, [isVisibleInput])

  return isVisibleInput ? (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        onChange={formik.handleChange}
        value={formik.values.title}
        type='text'
        id='title'
        name='title'
      />
      {formik.errors.title ? <ErrorMassage>{formik.errors.title}</ErrorMassage> : null}

      <Wrapper>
        <StyledShortButton type='submit' background='transparent'>
          Add list
        </StyledShortButton>
        <StyledCloseButton onClick={handleClick} />
      </Wrapper>
    </Form>
  ) : (
    <StyledLongButton type='button' background='#ffffff3d' onClick={handleClick}>
      Add column
    </StyledLongButton>
  )
}

export default React.memo(AddListForm)

const Form = styled.form`
  min-width: 272px;
`

const Input = styled.input`
  width: 272px;
  margin-bottom: 10px;
  height: 32px;
  border-radius: 3px;
  padding: 5px;
  border-color: transparent;
`

const ErrorMassage = styled.div`
  color: tomato;
  margin-bottom: 5px;
`
const Wrapper = styled.div`
  position: relative;
`

const StyledLongButton = styled(Button)`
  min-width: 272px;
  display: flex;
  justify-content: center;
`
const StyledShortButton = styled(Button)`
  width: 136px;
  display: flex;
  justify-content: center;
`

const StyledCloseButton = styled(CloseButton)`
  right: 100px;
  background-color: transparent;
`
