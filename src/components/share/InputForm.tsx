import { FormikErrors, useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { createBoardsFetch } from '../../reducers/boardsReducer'
import Button from './Button'

type Props = {
  color: string
}

type FormValues = {
  color: string
  title: string
}

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {}

  if (!values.title) {
    errors.title = 'Required'
  }

  return
}

export const InputForm: React.FC<Props> = ({ color }) => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      title: '',
      color: '',
    },
    validate,
    onSubmit: () => {
      addNewBoard()
    },
  })

  formik.values.color = color

  const addNewBoard = () => {
    dispatch(createBoardsFetch(formik.values))
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Label htmlFor='title'>Title Board</Label>
      <Input
        onChange={formik.handleChange}
        value={formik.values.title}
        type='text'
        id='title'
        name='title'
      />
      {formik.errors.title ? <ErrorMassage>{formik.errors.title}</ErrorMassage> : null}
      <Button type='submit' darkblue>
        Create Board
      </Button>
    </Form>
  )
}

const Label = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
`
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

