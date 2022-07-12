import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Card } from './CardItem'
import { getCardsFetch } from '../reducers/cards'
import { selectCards } from '../selectors/cards'
import CreateCardForm from './CreateCardForm'

type Props = {
  title: string
  _id: string
}

export const List: React.FC<Props> = ({ title, _id }) => {
  const dispatch = useAppDispatch()
  const boardId = useParams().id
  const cards = useAppSelector(selectCards)
  const cardsByList = cards.filter((item) => item.listId === _id)

  useEffect(() => {
    dispatch(getCardsFetch(boardId))
  }, [dispatch])

  return (
    <Root>
      <Title>{title}</Title>
      <CardList>
        {cardsByList.map((item) => (
          <Card key={item._id} {...item}/>
        ))}
      </CardList>
      <CreateCardForm boardId={boardId} listId={_id}/>
    </Root>
  )
}

const Root = styled.div`
  background-color: #ebecf0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 100%;
  border-radius: 3px;
  padding: 8px;
  min-width: 272px;
`

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`

const Title = styled.h2`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`

