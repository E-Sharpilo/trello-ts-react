import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/urlConstants'

type Props = {
  title: string
  _id: string
  boardId?: string
}

const CardItem: React.FC<Props> = ({ title, _id, boardId }) => {
  return (
    <StyledLink to={`${ROUTES.BOARD_PATH}/${boardId}${ROUTES.CARD_PATH}/${_id}`}>
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
