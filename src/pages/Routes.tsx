import Layout from '../components/Layout'
import Board from './Board'
import Boards from './Boards'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '../constants/urlConstants'
import { CardPage } from './CardPage'

export const RoutesPage = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN_PATH} element={<Layout />}>
        <Route index element={<Boards />} />
        <Route path={ROUTES.TO_BOARD_PATH} element={<Board />} />
        <Route path={ROUTES.TO_CARD_PATH} element={<CardPage />} />
      </Route>
    </Routes>
  )
}
