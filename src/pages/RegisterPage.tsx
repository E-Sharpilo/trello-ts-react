import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/share/Button';
import { Formik, Form } from 'formik';
import { InputField } from '../components/share/InputField';
import { validate } from '../utils/validateRegisterForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getRegistrationFetch } from '../reducers/user';
import { selectUser } from '../selectors/user';
import ErrorMessage from '../components/share/ErrorMessage';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(selectUser)

  const [visibleError, setVisibleError] = useState(false)

  
  useEffect(() => {
    if (error?.response?.status === 400) {
      setVisibleError(true)
      setTimeout(() => {
        setVisibleError(false)
      }, 2000);
    }
  }, [error])

  return (
    <Wrapper>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          dispatch(getRegistrationFetch(values));
        }}
      >
        {(formik) => (
          <StyledForm>
            <h1>Sign Up</h1>
            <InputField
              label='First name*'
              name='firstName'
              type='text'
            />
            <InputField
              label='Last Name*'
              name='lastName'
              type='text'
            />
            <InputField
              label='Email*'
              name='email'
              type='email'
            />
            <InputField
              label='Password*'
              name='password'
              type='password'
            />
            <InputField
              label='Confirm password*'
              name='confirmPassword'
              type='password'
            />
            <GroupBtn>
              <Button
                type='submit'
                background='#026aa7'
              >
                Registration
              </Button>
              <Button
                type='reset'
                background='#960303'
                onClick={formik.resetForm}
              >
                Reset
              </Button>
            </GroupBtn>
          </StyledForm>
        )}
      </Formik>
      {error?.response?.status === 400 && visibleError && <ErrorMessage>Email already registered</ErrorMessage>}
    </Wrapper>
  );
};

export default React.memo(RegisterForm);

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GroupBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;
