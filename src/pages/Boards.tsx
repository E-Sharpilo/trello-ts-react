import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getBoardsFetch } from '../reducers/boards'
import BoardItem from '../components/BoardItem'
import { selectBoards } from '../selectors/boards'
import Loader from '../components/share/Loader'

const Boards: React.FC = () => {
  const {boards, loading} = useAppSelector(selectBoards)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBoardsFetch(null))
  }, [dispatch])


  if (loading) {
    return <Wrapper>
      <Loader />
    </Wrapper>
  }

  return (
    <Container>
      <BoardsHeader>{boards.length ? 'My boards' : 'You don\'t have boards yet'}</BoardsHeader>
      <BoardsList>
        {boards.map((board) => (
          <BoardItem key={board._id} board={board} />
        ))}
      </BoardsList>
    </Container>
  )
}

export default React.memo(Boards)

const Wrapper = styled.div`
  position: relative;
  height: 90vh;
  width: 100%;
`

const BoardsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
`

const BoardsHeader = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  position: relative;
  padding-left: 35px;
`
