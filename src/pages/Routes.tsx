import Layout from '../components/Layout'
import Board from './Board'
import Boards from './Boards'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '../constants/urlConstants'
import { CardPage } from './CardPage'
import { useAppSelector } from '../hooks'
import { selectUser } from '../selectors/user'
import LoginForm from '../components/LoginForm'

export const RoutesPage = () => {
  const { user } = useAppSelector(selectUser)

  if (!Object.keys(user).length) {
    return (
      <Routes>
        <Route index element={<LoginForm />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path={ROUTES.MAIN_PATH} element={<Layout />}>
        <Route index element={<Boards />} />
        <Route path={ROUTES.TO_BOARD_PATH} element={<Board />} />
        <Route path={ROUTES.TO_BOARD_PATH + ROUTES.TO_CARD_PATH} element={<CardPage />} />
      </Route>
    </Routes>
  )
}
