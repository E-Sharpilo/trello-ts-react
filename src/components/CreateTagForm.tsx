/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createTagsFetch, createTagsSuccess } from '../reducers/tags'
import { selectCard } from '../selectors/card'
import { selectTags } from '../selectors/tags'
import ColorPicker from './ColorPicker'
import Button from './share/Button'
import { ArrowLeft } from './share/icons/ArrowLeft'

const colors = [
  '#61bd4f',
  '#f2d600',
  '#ff9f1a',
  '#eb5a46',
  '#c377e0',
  '#0079bf',
  '#00c2e0',
  '#51e898',
  '#ff78cb',
  '#344563',
]

type Props = {
  onClose: () => void
}

const CreateTagForm: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState('')
  const [color, setColor] = useState(colors[0])

  const tags = useAppSelector(selectTags)
  const card = useAppSelector(selectCard)
  const dispatch = useAppDispatch()

  const inputHandle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value)
    },
    [setTitle],
  )

  const createTag = useCallback(() => {
    const newTag = {
      title: title.trim(),
      color,
      cardId: card._id,
    }

    const notUniq = tags.some(tag => tag.color === newTag.color && tag.title === newTag.title)

    if (notUniq) {
      onClose()
      return
    }

    dispatch(createTagsFetch(newTag))
    onClose()
  }, [dispatch, color, title])

  const submitHandle = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      createTag()
    },
    [createTag],
  )

  return (
    <Root>
      <Wrapper>
        <ArrowLeft onClick={onClose} />
      </Wrapper>
      <Title>Create Tag</Title>
      <form onSubmit={submitHandle}>
        <div>Title</div>
        <input value={title} onChange={inputHandle} />
      </form>
      <ColorPicker backgroundColor={color} colors={colors} setBackgroundColor={setColor} />
      <Button type='submit' background='#0079bf'>
        Create Tag
      </Button>
    </Root>
  )
}

export default React.memo(CreateTagForm)

const Title = styled.div`
  padding: 5px 40px;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  line-height: 24px;
  text-align: center;
`

const Root = styled.div``

const Wrapper = styled.div`
  position: absolute;
`
