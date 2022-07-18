import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getBoardsFetch } from '../reducers/boards'
import { getCardFetch } from '../reducers/card'
import { selectCard } from '../selectors/card'

export const CardPage: React.FC = () => {
  const cardId = useParams().idc
  const dispatch = useAppDispatch()
  const card = useAppSelector(selectCard)

  useEffect(() => {
    dispatch(getBoardsFetch(null))
  }, [dispatch])

  useEffect(() => {
    dispatch(getCardFetch(cardId))
  }, [dispatch, cardId])

  return (
    <Container>
      <Title>{card.title}</Title>
    </Container>
  )
}

export default React.memo(CardPage)

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`

const Container = styled.div`
  border-radius: 3px;
  padding: 15px;
  margin: auto;
  margin-top: 50px;
  min-height: 800px;
  width: 100%;
  max-width: 768px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; ;
`
