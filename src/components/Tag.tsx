import React from 'react'
import styled from 'styled-components'
import PencilSvg from './share/icons/PencilSvg'

type Props = {
  color: string
  title?: string
  editingToggle: () => void
}

type StyleProps = {
  backgroundColor: string
}

const Tag: React.FC<Props> = ({ color, title, editingToggle }) => {
  return (
    <Root>
      <TagColor backgroundColor={color}>{title}</TagColor>
      <EditButton onClick={editingToggle}>
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
