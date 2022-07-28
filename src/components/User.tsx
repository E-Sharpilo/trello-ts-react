import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../constants/urlConstants';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getLogoutFetch } from '../reducers/user';
import { selectUser } from '../selectors/user';
import Button from './share/Button';
import Popup from './share/Popup';

const User = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const { user } = useAppSelector(selectUser);

  const togglePopup = useCallback(() => {
    setIsVisiblePopup(!isVisiblePopup);
  }, [isVisiblePopup]);

  const logout = useCallback(() => {
    dispatch(getLogoutFetch(null));
    navigate(`${ROUTES.MAIN_PATH}`)
  }, [dispatch]);

  return (
    <>
      <Button
        type='button'
        background='#014a75'
        onClick={togglePopup}
      >
        My Account
      </Button>
      {isVisiblePopup && (
        <>
          <Popup
            onClose={togglePopup}
            coords={{ top: '1.5vh', right: '130px' }}
          >
            <Title>My account</Title>
            <UserInfo>
              <div>First name: {user.firstName}</div>
              <div>Last name: {user.lastName}</div>
              <div>Email: {user.email}</div>
            </UserInfo>
            <Button
              type='button'
              background='#014a75'
              onClick={logout}
            >
              Logout
            </Button>
          </Popup>
        </>
      )}
    </>
  );
};

export default React.memo(User);

const UserInfo = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.div`
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  line-height: 28px;
  font-weight: 700;
  text-align: center;
`;
