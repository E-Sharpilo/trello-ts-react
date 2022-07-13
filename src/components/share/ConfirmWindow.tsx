import React from 'react'
import styled from 'styled-components'
import Button from './Button'

type Props = {
  deleteList: () => void
}

const ConfirmWindow: React.FC<Props> = ({deleteList}) => {
  return (
    <Root>
      <h3>Are you sure you want to delete this item?</h3>
      <div>
        You don&apos;t have previous to restore. This item would be deleted, are you sure you want
        to continue
      </div>
      <Wrapper>
        <StyledButton type='button'>Cancel</StyledButton>
        <StyledButton type='button' background={'#b04632'} onClick={deleteList}>Delete</StyledButton>
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