import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/urlConstants';
import Tags from './Tags';
import { CardTags } from '../types/card_tags';

type Props = {
  title: string;
  _id: string;
  boardId?: string;
  description?: string;
  tagsId: CardTags[];
};

const CardItem: React.FC<Props> = ({ title, _id, boardId, description, tagsId }) => {
  return (
    <StyledLink to={`${ROUTES.BOARD_PATH}/${boardId}${ROUTES.CARD_PATH}/${_id}`}>
      <StyledCard>
        <Tags tagsId={tagsId} />
        {title}
        {description}
      </StyledCard>
    </StyledLink>
  );
};

export default React.memo(CardItem);

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledCard = styled.div`
  background-color: #fff;
  word-wrap: break-word;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  min-height: 30px;
  padding: 8px;
`;
