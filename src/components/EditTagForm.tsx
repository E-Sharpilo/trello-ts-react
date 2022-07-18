import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { deleteTagsFetch, updateTagsFetch } from '../reducers/tags'
import { selectTag } from '../selectors/tags'
import ColorPicker from './ColorPicker'
import Button from './share/Button'
import ConfirmWindow from './share/ConfirmWindow'
import { ArrowLeft } from './share/icons/ArrowLeft'
import Modal from './share/Modal'

type Props = {
  onClose: () => void
  colors: string[]
}

const EditTagForm: React.FC<Props> = ({ onClose, colors }) => {
  const dispatch = useAppDispatch()
  const tag = useAppSelector(selectTag)

  const [title, setTitle] = useState(tag?.title)
  const [color, setColor] = useState(colors[0])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  const inputHandle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value)
    },
    [setTitle],
  )

  const updateTag = useCallback(() => {
    dispatch(updateTagsFetch({ color, title, id: tag.id }))
    onClose()
  }, [dispatch, color, title])

  const submitHandle = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      updateTag()
    },
    [updateTag],
  )

  const deleteTag = useCallback(() => {
    dispatch(deleteTagsFetch(tag.id))
    onClose()
  }, [dispatch])

  return (
    <Root>
      <Wrapper>
        <ArrowLeft onClick={onClose} />
      </Wrapper>
      <Title>Edit Tag</Title>
      <form onSubmit={submitHandle} id='edit'>
        <Label>Title</Label>
        <Input value={title} onChange={inputHandle} />
      </form>
      <ColorPicker backgroundColor={color} colors={colors} setBackgroundColor={setColor} />
      <BtnGroup>
        <Button type='submit' background='#0079bf' form='edit'>
          Edit Tag
        </Button>
        <Button type='button' background='#b04632' onClick={toggleModal}>
          Delete
        </Button>
      </BtnGroup>

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

export default React.memo(EditTagForm)

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const Title = styled.div`
  padding: 5px 40px;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  line-height: 24px;
  text-align: center;
`

const Label = styled.div`
  font-size: 18px;
  margin-top: 10px;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin: 10px 0;
`

const Root = styled.div``

const Wrapper = styled.div`
  position: absolute;
`
