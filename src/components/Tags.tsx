/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks';

import { selectTags } from '../selectors/tags';
import { CardTags } from '../types/card_tags';

type Props = {
  tagsId?: CardTags[];
  inCard?: boolean;
};

type StyleProps = {
  backGround?: string;
  inCard?: boolean;
};

const Tags: React.FC<Props> = ({ tagsId, inCard }) => {
  const { tags: allTags } = useAppSelector(selectTags);

  const tagsForCard = allTags.filter((tag) => tagsId?.some((item) => item.tagId === tag._id));

  return tagsForCard.length ? (
    <TagsList inCard>
      {tagsForCard.map((tag) => (
        <Tag
          key={tag._id}
          backGround={tag.color}
        >
          {inCard && tag.title}
        </Tag>
      ))}
    </TagsList>
  ) : null;
};

export default React.memo(Tags);

const TagsList = styled.ul<StyleProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-width: 90%;
`;

const Tag = styled.li<StyleProps>`
  margin: 0;
  padding: 0;
  min-height: 5px;
  min-width: 40px;
  border-radius: 3px;
  line-height: 30px;
  color: #fff;
  padding: 0 10px;
  background-color: ${(props) => props.backGround};
`;
