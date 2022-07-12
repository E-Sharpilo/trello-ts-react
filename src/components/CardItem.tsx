import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { url } from '../constants/urlConstants'
import { TCard } from '../types/card'


export const Card: React.FC<TCard> = ({ title, _id }) => {
  return (
    <StyledLink to={`${url.CARD_PATH}/${_id}`}>
      <StyledCard>{title}</StyledCard>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
` 

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  min-height: 30px;
  padding: 8px;
`
