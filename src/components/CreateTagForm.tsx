/* eslint-disable no-unused-vars */
import { create } from 'domain'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createTagsFetch } from '../reducers/tags'
import { selectCard } from '../selectors/card'
import { selectTags } from '../selectors/tags'
import ColorPicker from './ColorPicker'
import Button from './share/Button'
import { ArrowLeft } from './share/icons/ArrowLeft'


type Props = {
  onClose: () => void
  colors: string[]
}

const CreateTagForm: React.FC<Props> = ({ onClose, colors }) => {
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
      <form onSubmit={submitHandle} id='create'>
        <Label>Title</Label>
        <Input value={title} onChange={inputHandle} />
      </form>
      <ColorPicker backgroundColor={color} colors={colors} setBackgroundColor={setColor} />
      <StyledButton type='submit' background='#0079bf' form='create'>
        Create Tag
      </StyledButton>
    </Root>
  )
}

export default React.memo(CreateTagForm)

const Label = styled.div`
  font-size: 18px;
  margin-top: 10px;
`

const StyledButton = styled(Button)`
  margin-top: 10px;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin: 10px 0;
`

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
