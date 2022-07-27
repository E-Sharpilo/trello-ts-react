import Layout from '../components/Layout'
import Board from './Board'
import Boards from './Boards'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '../constants/urlConstants'
import { CardPage } from './CardPage'
import { useAppSelector } from '../hooks'
import { selectUser } from '../selectors/user'
import LoginForm from './LoginPage'
import Loader from '../components/share/Loader'
import RegisterPage from './RegisterPage'

export const RoutesPage = () => {
  const { loading, user } = useAppSelector(selectUser)

  console.log('rout', user);
  

  if (loading) {
    return <Loader />
  }

  if (!Object.keys(user).length) {
    return (
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path={ROUTES.REGISTRATION_PATH} element={<RegisterPage />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path={ROUTES.MAIN_PATH} element={<Layout />}>
        <Route index element={<Boards />} />
        <Route path={ROUTES.TO_BOARD_PATH} element={<Board />} />
        <Route path={ROUTES.TO_BOARD_PATH + ROUTES.TO_CARD_PATH} element={<CardPage />} />
        <Route path='*' element={<Boards />} />
      </Route>
    </Routes>
  )
}
