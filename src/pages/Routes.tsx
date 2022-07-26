import Layout from '../components/Layout'
import Board from './Board'
import Boards from './Boards'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '../constants/urlConstants'
import { CardPage } from './CardPage'
import { useAppDispatch, useAppSelector } from '../hooks'
import { selectUser } from '../selectors/user'
import LoginForm from '../components/LoginForm'
import { useEffect } from 'react'
import { getRefreshFetch } from '../reducers/user'
import Loader from '../components/share/Loader'

export const RoutesPage = () => {
  const dispatch = useAppDispatch()
  const { loading, user } = useAppSelector(selectUser)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getRefreshFetch(null))
    }
  }, [])

  if (loading) {
    return <Loader />
  }

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
        <Route path='*' element={<Boards />} />
      </Route>
    </Routes>
  )
}
