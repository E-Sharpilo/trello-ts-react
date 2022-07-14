import React from 'react'
import styled from 'styled-components'
import Button from './Button'

type Props = {
  onDelete?: () => void
  onClose: () => void
  title: string
  text: string
}

const ConfirmWindow: React.FC<Props> = ({onDelete, onClose, title, text}) => {
  return (
    <Root>
      <h3>{title}</h3>
      <div>{text}</div>
      <Wrapper>
        <StyledButton type='button' onClick={onClose}>Cancel</StyledButton>
        <StyledButton type='button' background={'#b04632'} onClick={onDelete}>Delete</StyledButton>
      </Wrapper>
    </Root>
  )
}

export default React.memo(ConfirmWindow)

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
  gap: 10px;
`

const Root = styled.div`
  max-width: 400px;
`

const StyledButton = styled(Button)`
  border: 1px solid black;
  color: #000
`