import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { RoutesPage } from './pages/Routes'
import { getUserFetch } from './reducers/user'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUserFetch(null))
  }, [])

  return <RoutesPage />
}
export default App
