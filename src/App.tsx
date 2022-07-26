import { useEffect } from 'react'
import Loader from './components/share/Loader'
import { useAppDispatch, useAppSelector } from './hooks'
import { RoutesPage } from './pages/Routes'
import { getRefreshFetch } from './reducers/user'
import { selectUser } from './selectors/user'

function App() {
  const dispatch = useAppDispatch()
  const {loading} = useAppSelector(selectUser)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getRefreshFetch(null))
    }
  }, [])

  if (loading) {
    return <Loader />
  }

  return <RoutesPage />
}
export default App
