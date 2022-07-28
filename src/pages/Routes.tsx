import Layout from '../components/Layout';
import Board from './Board';
import Boards from './Boards';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/urlConstants';
import { CardPage } from './CardPage';
import { useAppSelector } from '../hooks';
import { selectUser } from '../selectors/user';
import LoginForm from './LoginPage';
import Loader from '../components/share/Loader';
import RegisterPage from './RegisterPage';

export const RoutesPage = () => {
  const { loading, user } = useAppSelector(selectUser);

  if (loading) {
    return <Loader />;
  }

  if (!Object.keys(user).length) {
    return (
      <Routes>
        <Route
          path={ROUTES.MAIN_PATH}
          element={<Layout />}
        >
          <Route
            path={ROUTES.MAIN_PATH}
            element={<LoginForm />}
          />
          <Route
            path={ROUTES.REGISTRATION_PATH}
            element={<RegisterPage />}
          />
        </Route>
        <Route
          path='*'
          element={<Navigate to={ROUTES.MAIN_PATH} />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path={ROUTES.MAIN_PATH}
        element={<Layout />}
      >
        <Route
          path={ROUTES.MAIN_PATH}
          element={<Boards />}
        />
        <Route
          path={ROUTES.TO_BOARD_PATH}
          element={<Board />}
        />
        <Route
          path={ROUTES.TO_BOARD_PATH + ROUTES.TO_CARD_PATH}
          element={<CardPage />}
        />
      </Route>
      {/* <Route
        path='*'
        element={<Navigate to={ROUTES.MAIN_PATH} />}
      /> */}
    </Routes>
  );
};
