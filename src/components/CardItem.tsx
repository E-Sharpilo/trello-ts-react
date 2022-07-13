import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { url } from '../constants/urlConstants'
import { TCard } from '../types/card'


const CardItem: React.FC<TCard> = ({ title, _id }) => {
  return (
    <StyledLink to={`${url.CARD_PATH}/${_id}`}>
      <StyledCard>{title}</StyledCard>
    </StyledLink>
  )
}

export default React.memo(CardItem)

const StyledLink = styled(Link)`
  text-decoration: none;
` 

const StyledCard = styled.div`
  background-color: #fff;
  word-wrap: break-word;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  min-height: 30px;
  padding: 8px;
`
