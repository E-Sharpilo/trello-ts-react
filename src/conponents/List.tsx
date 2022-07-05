import styled from 'styled-components'
import { TCard } from '../types/card'
import { Card } from './Card'
import { Button } from './share/button'

type Props = {
  title: string
  cards: TCard[]
}

export const List: React.FC<Props> = ({ title, cards }) => {
  return (
    <StyledList>
      <StyledTitle>{title}</StyledTitle>
      {cards.map((card) => (
        <Card key={card._id} title={card.title} />
      ))}
      <StyledButton>Add card</StyledButton>
    </StyledList>
  )
}

const StyledButton = styled(Button)`
  color: #172b4d;
  &:hover{
    background-color: #dadbe2;
  }
`

const StyledList = styled.div`
  background-color: #ebecf0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 100%;
  border-radius: 3px;
  padding: 8px;
  width: 272px;
`
const StyledTitle = styled.h2`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`
