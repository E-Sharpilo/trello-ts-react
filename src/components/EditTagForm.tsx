import React from 'react'
import styled from 'styled-components'
import { ArrowLeft } from './share/icons/ArrowLeft'

type Props = {
  onClose: () => void
}

const EditTagForm: React.FC<Props> = ({ onClose }) => {
  return (
    <Root>
      <Wrapper>
        <ArrowLeft onClick={onClose} />
      </Wrapper>
      <Title>Edit Tag</Title>
    </Root>
  )
}

export default React.memo(EditTagForm)

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
