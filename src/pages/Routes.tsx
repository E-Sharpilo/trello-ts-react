import Layout from '../components/Layout'
import Board from './Board'
import Boards from './Boards'
import { Card } from './Card'
import { Routes, Route } from 'react-router-dom'
import { url } from '../constants/urlConstants'

export const RoutesPage = () => {
  return (
    <Routes>
      <Route path={url.MAIN_PATH} element={<Layout />}>
        <Route index element={<Boards />} />
        <Route path={url.BOARD_PATH + '/:id'} element={<Board />} />
        <Route path={url.CARD_PATH + '/:id'} element={<Card />} />
      </Route>
    </Routes>
  )
}
