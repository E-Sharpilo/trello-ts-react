import styled from 'styled-components'
import { TCard } from '../types/card'
import { Card } from './Card'


type Props = {
  title: string
  cards: TCard[]
}

export const List: React.FC<Props> = ({ title, cards }) => {
  return (
    <Div>
      <Title>{title}</Title>
      {cards.map((card) => (
        <Card key={card._id} title={card.title} />
      ))}
    </Div>
  )
}

// const StyledButton = styled(Button)`
//   color: #172b4d;
//   &:hover{
//     background-color: #dadbe2;
//   }
// `

const Div = styled.div`
  background-color: #ebecf0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 100%;
  border-radius: 3px;
  padding: 8px;
  width: 272px;
`
const Title = styled.h2`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`
