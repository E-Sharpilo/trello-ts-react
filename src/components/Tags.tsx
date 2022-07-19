/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getCardTagsFetch } from '../reducers/cardTags'
import { selectCardTags } from '../selectors/cardTags'
import { selectTags } from '../selectors/tags'

type Props = {
  cardId?: string
  inCard?: boolean
}

type StyleProps = {
  backGround: string
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
    return <>Loading</>
  }

  return tags.length ? (
    <TagsList>
      {tags.map((tag) => (
        <Tag key={tag._id} backGround={tag.color}>
          {inCard && tag.title}
        </Tag>
      ))}
    </TagsList>
  ) : null
}

export default React.memo(Tags)

const TagsList = styled.ul`
  display: flex;
  gap: 5px;
`

const Tag = styled.li<StyleProps>`
  margin: 0;
  padding: 0;
  min-height: 20px;
  min-width: 40px;
  border-radius: 3px;
  line-height: 30px;
  padding: 0 10px;
  background-color: ${(props) => props.backGround};
`
