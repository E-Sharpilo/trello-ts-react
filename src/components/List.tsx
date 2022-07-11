import styled from 'styled-components'
import { Card } from '../pages/Card'
import { TCard } from '../types/card'
import Button from './share/Button'

type Props = {
  title: string
  cards: TCard[]
}

export const List: React.FC<Props> = ({ title, cards}) => {
  
  return (
    <Root>
      <Title>{title}</Title>
      {cards && cards.map((card) => (
        <Card key={card._id} card={card}/>
      ))}
      <StyledButton type='button' background='transparent'>
        Add Card
      </StyledButton>
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
const Title = styled.h2`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`
const StyledButton = styled(Button)`
  color: #5e6c84;
  &:hover {
    background-color: #091e4214;
  }
`
