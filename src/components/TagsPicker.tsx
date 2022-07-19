/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createTagsFetch, deleteTagsFetch, updateTagsFetch } from '../reducers/tags'
import { selectCard } from '../selectors/card'
import { selectTags } from '../selectors/tags'
import Button from './share/Button'
import ConfirmWindow from './share/ConfirmWindow'
import { CloseButton } from './share/icons/CloseButton'
import Loader from './share/Loader'
import Modal from './share/Modal'
import Tag from './Tag'
import TagForm from './TagForm'

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

export enum FormState {
  Create = 'create',
  Editing = 'editing',
}

const TagsPicker: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const card = useAppSelector(selectCard)
  const { tags, loading } = useAppSelector(selectTags)

  const [newTitle, setNewTitle] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [color, setColor] = useState(colors[0])
  const [formState, setFormState] = useState<FormState | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [chosenTagId, setChosenTagId] = useState('')

  useEffect(() => {
    const tag = tags.find((item) => item._id === chosenTagId)
    if (!tag) {
      return
    }
    setEditTitle(tag.title ?? '')
  }, [chosenTagId])

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  const deleteTag = useCallback(() => {
    dispatch(deleteTagsFetch(chosenTagId))
    toggleModal()
    setFormState(null)
  }, [dispatch, chosenTagId, isModalOpen])

  const updateTag = useCallback(() => {
    const notUniq = tags.some((tag) => tag.color === color && tag.title === editTitle)

    if (notUniq) {
      setFormState(null)
      return
    }

    dispatch(updateTagsFetch({ color, title: editTitle, id: chosenTagId }))
    setFormState(null)
  }, [dispatch, editTitle, chosenTagId, color])

  const createTag = useCallback(() => {
    const newTag = {
      title: newTitle.trim(),
      color: color,
      cardId: card.card._id,
    }

    const notUniq = tags.some((tag) => tag.color === newTag.color && tag.title === newTag.title)

    if (notUniq) {
      setNewTitle('')
      setFormState(null)
      return
    }
    setNewTitle('')
    setFormState(null)
    dispatch(createTagsFetch(newTag))
  }, [dispatch, color, newTitle])

  const setCreateForm = useCallback(() => {
    setFormState(FormState.Create)
  }, [formState])

  const setEditForm = useCallback(() => {
    setFormState(FormState.Editing)
  }, [formState])

  const setDefaultForm = useCallback(() => {
    setFormState(null)
  }, [formState])

  if (loading) {
    return <Loader/>
  }

  return (
    <Root>
      <CloseButton onClick={onClose} />
      {formState ? (
        <TagForm
          formState={formState}
          colors={colors}
          color={color}
          setColor={setColor}
          setNewTitle={setNewTitle}
          setEditTitle={setEditTitle}
          createTag={createTag}
          setDefaultForm={setDefaultForm}
          title={formState === FormState.Create ? newTitle : editTitle}
          updateTag={updateTag}
          toggleModal={toggleModal}
        />
      ) : (
        <>
          <Title>Tags</Title>
          <TagsList>
            {tags.map((tag) => (
              <Tag
                key={tag._id}
                title={tag.title}
                color={tag.color}
                id={tag._id}
                setEditForm={setEditForm}
                setChosenTagId={setChosenTagId}
              />
            ))}
          </TagsList>
          <StyledButton type='button' onClick={setCreateForm}>
            Create Tag
          </StyledButton>
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ConfirmWindow
          onDelete={deleteTag}
          onClose={toggleModal}
          title={'Are you sure you want to delete this item?'}
          text={
            'You don\'t have previous to restore. This item would be deleted, are you sure you want to continue'
          }
        />
      </Modal>
    </Root>
  )
}

export default React.memo(TagsPicker)

const Title = styled.div`
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  line-height: 24px;
  text-align: center;
  padding: 5px;
`

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  color: #172b4d;
  display: flex;
  justify-content: center;
  vertical-align: middle;
`

const Root = styled.div`
  position: relative;
`
const TagsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;
`
