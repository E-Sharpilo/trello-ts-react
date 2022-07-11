import { FormikErrors, useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { deleteBoardsFetch, updateBoardsFetch } from '../reducers/boards'
import Button from './share/Button'

type FormValues = {
  title: string
}

type Props = {
  title: string
  id: string
}

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {}

  if (!values.title) {
    errors.title = 'Required'
  }

  return errors
}

const EdtBoardForm: React.FC<Props> = ({ title, id }) => {
  const dispatch = useDispatch()

  const deleteBoard = () => {
    dispatch(deleteBoardsFetch(id))
  }

  const formik = useFormik({
    initialValues: {
      title: title,
      id,
    },
    validate,
    onSubmit: () => {
      updateTitle()
    },
  })

  const updateTitle = () => {
    dispatch(updateBoardsFetch(formik.values))
  }

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          onChange={formik.handleChange}
          value={formik.values.title}
          type='text'
          id='title'
          name='title'
        />
        {formik.errors.title ? <ErrorMassage>{formik.errors.title}</ErrorMassage> : null}
        <Button type='submit' background='#014a75'>
          Edit title
        </Button>
      </Form>
      <StyledButton type='button' background='#b04632' onClick={deleteBoard}>
        Delete Board
      </StyledButton>
    </>
  )
}

export default React.memo(EdtBoardForm)

const Form = styled.form`
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 2px solid #172b4d;
  border-radius: 3px;
  outline: none;
  &:focus {
    border-color: #0079bf;
  }
`

const ErrorMassage = styled.div`
  color: tomato;
  margin-bottom: 5px;
`

const StyledButton = styled(Button)`
margin-top: 5px;
  &:hover {
    background-color: #933b27;
  }
`
