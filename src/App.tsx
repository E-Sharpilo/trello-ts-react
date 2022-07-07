import { Routes, Route } from 'react-router-dom'
import Boards from './pages/Boards'
import Board from './pages/Board'
import Layout from './components/Layout'
import { Card } from './pages/Card'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Boards />} />
        <Route path='/board/:id' element={<Board />} />
        <Route path='/card' element={<Card />} />
      </Route>
    </Routes>
  )
}

export default App
