import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getTagsFetch } from '../reducers/tags'
import { selectTags } from '../selectors/tags'
import CreateTagForm from './CreateTagForm'
import EditTagForm from './EditTagForm'
import Button from './share/Button'
import { CloseButton } from './share/icons/CloseButton'
import Tag from './Tag'

type Props = {
  onClose: () => void
}

const TagsPicker: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector(selectTags)

  const [isCreate, setIsCreate] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const createToggle = useCallback(() => {
    setIsCreate(!isCreate)
  }, [isCreate])

  const editingToggle = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  useEffect(() => {
    dispatch(getTagsFetch(null))
  }, [dispatch])

  return (
    <Root>
      <CloseButton onClick={onClose} />
      {isCreate ? (
        <CreateTagForm onClose={createToggle} />
      ) : isEditing ? (
        <EditTagForm onClose={editingToggle}/>
      ) : (
        <>
          <Title>Tags</Title>
          <TagsList>
            {tags.map((tag) => (
              <Tag
                key={tag._id}
                title={tag.title}
                color={tag.color}
                editingToggle={editingToggle}
              />
            ))}
          </TagsList>
          <StyledButton type='button' onClick={createToggle}>
            Create Tag
          </StyledButton>
        </>
      )}
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
