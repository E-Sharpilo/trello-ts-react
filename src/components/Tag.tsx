import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../hooks'
import { setChosenTag } from '../reducers/tags'
import PencilSvg from './share/icons/PencilSvg'

type Props = {
  color: string
  title?: string
  editingToggle: () => void
  id: string
}

type StyleProps = {
  backgroundColor: string
}

const Tag: React.FC<Props> = ({ color, title, editingToggle, id}) => {
  const dispatch = useAppDispatch()

  const setTag = useCallback(() => {
    editingToggle()
    dispatch(setChosenTag({id, color, title}))
  }, [dispatch, id])

  return (
    <Root>
      <TagColor backgroundColor={color}>{title}</TagColor>
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
  &:hover{
    background-color: #cecccc;
  }
`

const TagColor = styled.div<StyleProps>`
  background-color: ${(props) => props.backgroundColor};
  min-height: 20px;
  min-width: 200px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 3px;
  font-weight: 700;
  color: #fff;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
`

const Root = styled.li`
  display: flex;
  gap: 5px;
`
