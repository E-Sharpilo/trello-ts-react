/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getCardTagsFetch } from '../reducers/cardTags'
import { selectCardTags } from '../selectors/cardTags'
import { selectTags } from '../selectors/tags'
import Loader from './share/Loader'

type Props = {
  cardId?: string
  inCard?: boolean
}

type StyleProps = {
  backGround?: string
  inCard?: boolean
}

const Tags: React.FC<Props> = ({ cardId, inCard }) => {
  const dispatch = useAppDispatch()
  const { tags: allTags } = useAppSelector(selectTags)
  const { cardTags, loading } = useAppSelector(selectCardTags)

  useEffect(() => {
    dispatch(getCardTagsFetch(cardId))
  }, [dispatch])

  const tags = allTags.filter((item) => cardTags.some((cardTag) => item._id === cardTag.tagId))

  if (loading) {
    return <Loader />
  }

  return tags.length ? (
    <TagsList inCard>
      {tags.map((tag) => (
        <Tag key={tag._id} backGround={tag.color}>
          {inCard && tag.title}
        </Tag>
      ))}
    </TagsList>
  ) : null
}

export default React.memo(Tags)

const TagsList = styled.ul<StyleProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-width: 90%;
`

const Tag = styled.li<StyleProps>`
  margin: 0;
  padding: 0;
  min-height: 5px;
  min-width: 40px;
  border-radius: 3px;
  line-height: 30px;
  padding: 0 10px;
  background-color: ${(props) => props.backGround};
`
