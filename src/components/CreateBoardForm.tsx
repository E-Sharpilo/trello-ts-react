import React, { useState } from 'react'
import styled from 'styled-components'
import BorderPreview from './share/icons/BorderPreview'

import InputForm from './InputForm'
import ColorPicker from './ColorPicker'

const colors = ['#0079BF', '#D29034', '#399839', '#FFB046', '#89609E']

type Props = {
  onClose: () => void
}

type bgProps = {
  background: string
}

const CreateBoardForm: React.FC<Props> = ({ onClose }) => {
  const [backgroundColor, setBackgroundColor] = useState('#0079BF')

  return (
    <Container>
      <Title>Create board</Title>
      <PreviewContainer background={backgroundColor}>
        <BorderPreview />
      </PreviewContainer>
      <ColorPicker backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor} colors={colors}/>
      <InputForm color={backgroundColor} onClose={onClose} />
    </Container>
  )
}

export default React.memo(CreateBoardForm)

const Container = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  width: 100%;
  line-height: 28px;
  text-align: center;
`

const PreviewContainer = styled.div<bgProps>`
  margin: 10px 0;
  padding: 15px;
  border-radius: 3px;
  background-color: ${(prop) => prop.background};
`
