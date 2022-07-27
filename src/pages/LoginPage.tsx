import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../hooks';
import { getLoginFetch } from '../reducers/user';
import Button from '../components/share/Button';
import { Formik, Form } from 'formik';
import { InputField } from '../components/share/InputField';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/urlConstants';
import { validate } from '../utils/validateLoginForm';

const LoginFrom = () => {
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          dispatch(getLoginFetch(values));
        }}
      >
        {(formik) => (
          <StyledForm>
            <h1>Sign In</h1>
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
            <GroupBtn>
              <Button
                type='submit'
                background='#026aa7'
              >
                Login
              </Button>
              <Link to={ROUTES.REGISTRATION_PATH}>
                <Button
                  type='reset'
                  background='#207c14'
                  onClick={formik.resetForm}
                >
                  Registration
                </Button>
              </Link>
            </GroupBtn>
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default React.memo(LoginFrom);

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
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
