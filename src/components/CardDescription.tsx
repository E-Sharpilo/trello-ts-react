/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../hooks'
import { updateCardFetch } from '../reducers/card'
import Button from './share/Button'
import TextareaAutoSize from 'react-textarea-autosize'
import { TCard } from '../types/card'

type Props = {
  card: TCard
}

const CardDescription: React.FC<Props> = ({ card }) => {
  const [cardDescription, setCardDescription] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useAppDispatch()

  const toggleEditing = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  const updateCard = useCallback(() => {
    if (card.description !== cardDescription.trim()) {
      dispatch(updateCardFetch({ description: cardDescription, id: card._id }))
      setIsEditing(false)
    }
    setIsEditing(false)
  }, [dispatch, cardDescription])

  const submitHandle = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      updateCard()
    },
    [updateCard],
  )

  const inputHandle = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCardDescription(event.target.value)
    },
    [cardDescription],
  )

  const onBlurHandler = useCallback(() => {
    updateCard()
  }, [cardDescription])

  useEffect(() => {
    if (card) {
      setCardDescription(card.description)
    }
  }, [card])

  return (
    <Root>
      <Title>Card description</Title>

      {isEditing ? (
        <form onSubmit={submitHandle}>
          <StyledTextarea
            placeholder='Add description...'
            value={cardDescription}
            onChange={inputHandle}
            onBlur={onBlurHandler}
          />
          <Wrapper>
            <Button type='submit' background='#0079bf'>
              Save
            </Button>
            <CancelButton type='button' onClick={toggleEditing}>
              Cancel
            </CancelButton>
          </Wrapper>
        </form>
      ) : cardDescription.length === 0 ? (
        <AddDescription onClick={toggleEditing}>Add description...</AddDescription>
      ) : (
        <Pre onDoubleClick={toggleEditing}>{cardDescription}</Pre>
      )}
    </Root>
  )
}

export default React.memo(CardDescription)

const Pre = styled.pre`
  cursor: pointer;
  padding: 5px;
`

const CancelButton = styled(Button)`
  color: #000;
  border: 1px solid #000;
`
const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
`

const AddDescription = styled.div`
  padding: 5px;
  line-height: 20px;
  min-height: 60px;
  background-color: #091e421f;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: #091e423b;
  }
`

const StyledTextarea = styled(TextareaAutoSize)`
  width: 100%;
  min-height: 108px;
  resize: none;
  padding: 5px;
  line-height: 20px;
  font-size: 16px;
`

const Root = styled.div``
const Title = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  padding: 5px;
`
