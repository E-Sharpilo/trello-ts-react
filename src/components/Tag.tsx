import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createCardTagsFetch, deleteCardTagsFetch } from '../reducers/cardTags'
import { selectCardTags } from '../selectors/cardTags'
import PencilSvg from './share/icons/PencilSvg'
import CheckMark from './share/icons/CheckMark'

type Props = {
  color: string
  title?: string
  id: string
  setEditForm: () => void
  // eslint-disable-next-line no-unused-vars
  setChosenTagId: (id: string) => void
}

type StyleProps = {
  backgroundColor: string
}

const Tag: React.FC<Props> = ({ color, title, id, setEditForm, setChosenTagId }) => {
  const cardId = useParams().idc
  const { cardTags } = useAppSelector(selectCardTags)
  const [isSelectTag, setIsSelectTag] = useState(() => cardTags.some((item) => item.tagId === id))

  useEffect(() => {
    setIsSelectTag(() => cardTags.some((item) => item.tagId === id))
  }, [cardTags])

  const cardTagId = cardTags.find((item) => item.tagId === id && item.cardId === cardId)

  const dispatch = useAppDispatch()

  const toggleIsEditing = useCallback(() => {
    setIsSelectTag(!isSelectTag)
  }, [isSelectTag])

  const createCardTag = useCallback(() => {
    dispatch(createCardTagsFetch({ tagId: id, cardId }))
    toggleIsEditing()
  }, [isSelectTag, dispatch, id, cardId])

  const deleteCardTag = useCallback(() => {
    if (cardTagId) {
      dispatch(deleteCardTagsFetch({tagId: cardTagId._id, cardId}))
      toggleIsEditing()
    }
    return
  }, [isSelectTag, dispatch, cardTagId, cardId])

  const clickHandle = useCallback(() => {
    if (isSelectTag) {
      deleteCardTag()
    } else {
      createCardTag()
    }
  }, [createCardTag, deleteCardTag, isSelectTag])

  const setTag = useCallback(() => {
    setEditForm()
    setChosenTagId(id)
  }, [dispatch, id])

  return (
    <Root>
      <TagColor backgroundColor={color} onClick={clickHandle}>
        {title}
        {isSelectTag && <StyledCheckMark />}
      </TagColor>
      <EditButton onClick={setTag}>
        <PencilSvg />
      </EditButton>
    </Root>
  )
}

export default React.memo(Tag)

const EditButton = styled.div`
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #cecccc;
  }
`

const TagColor = styled.div<StyleProps>`
  background-color: ${(props) => props.backgroundColor};
  min-height: 20px;
  max-width: 200px;
  width: 100%;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 3px;
  font-weight: 700;
  color: #fff;
  word-wrap: break-word;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
`

const StyledCheckMark = styled(CheckMark)`
  float: right;
`

const Root = styled.li`
  display: flex;
  gap: 5px;
`
