import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../hooks'
import { getLoginFetch, getRegistrationFetch } from '../reducers/user'
import Button from './share/Button'

const LoginFrom = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [emailError, setEmailError] = useState('can\'t be empty')
  const [passwordError, setPasswordError] = useState('can\'t be empty')

  const dispatch = useAppDispatch()

  const blurHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
    case 'email':
      setEmailTouched(true)
      break

    case 'password':
      setPasswordTouched(true)
      break
    }
  }, [setEmailTouched, setPasswordTouched])

  const login = useCallback(() => {
    dispatch(getLoginFetch({ email, password }))
  }, [dispatch, email, password])

  const registration = useCallback(() => {
    dispatch(getRegistrationFetch({ email, password }))
  }, [dispatch, email, password])

  const inputEmailHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexp.test(String(event.target.value).toLowerCase())) {
        setEmailError('email not valid')
        if (!event.target.value) {
          setEmailError('can\'t be empty')
        }
      } else {
        setEmailError('')
      }
    },
    [email],
  )

  const inputPasswordHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
      if (event.target.value.length < 5 || event.target.value.length > 20) {
        setPasswordError('password should be less 20 and more 5 symbols')
        if (!event.target.value) {
          setPasswordError('can\'t be empty')
        }
      } else {
        setPasswordError('')
      }
    },
    [password],
  )

  return (
    <Wrapper>
      <Form>
        <Label>
          {emailTouched && emailError && <Error>{emailError}</Error>}
          <Input
            name='email'
            onBlur={blurHandler}
            onChange={inputEmailHandler}
            type='email'
            placeholder='Email'
            value={email}
            required
          />
        </Label>
        <Label>
          {passwordTouched && passwordError && <Error>{passwordError}</Error>}
          <Input
            name='password'
            onBlur={blurHandler}
            onChange={inputPasswordHandler}
            type='password'
            placeholder='Password'
            value={password}
            required
          />
        </Label>

        <GroupBtn>
          <Button type='button' background='#026aa7' onClick={login}>
            Login
          </Button>
          <Button type='button' background='#008000' onClick={registration}>
            Register
          </Button>
        </GroupBtn>
      </Form>
    </Wrapper>
  )
}

export default React.memo(LoginFrom)

const Error = styled.div`
  color: #940303;
`

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Label = styled.div`
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 5px;
`

const GroupBtn = styled.div`
  display: flex;
  justify-content: space-between;
`
