import React, { useState } from 'react'
import styled from 'styled-components'
import BorderPreview from './share/icons/BorderPreview'
import CheckMark from './share/icons/CheckMark'
import { InputForm } from './share/InputForm'

type Props = {
  background: string
}

const styles = ['#0079BF', '#D29034', '#399839', '#FFB046', '#89609E']

const CreateBoardForm: React.FC = () => {

  const [backgroundColor, setBackgroundColor] = useState('#0079BF')
  return (
    <Container>
      <Title>Create board</Title>
      <PreviewContainer background={backgroundColor}>
        <BorderPreview />
      </PreviewContainer>
      <List>
        {styles.map((item, i) => (
          <li key={i}>
            <ColorItem background={item} onClick={() => setBackgroundColor(item)}>
              {backgroundColor === item ? <CheckMark /> : ''}
            </ColorItem>
          </li>
        ))}
      </List>

      <InputForm color={backgroundColor} />
    </Container>
  )
}

export default React.memo(CreateBoardForm)

const List = styled.ul`
  display: flex;
  gap: 3px;
`

const ColorItem = styled.button<Props>`
  width: 40px;
  height: 32px;
  background-color: ${(prop) => prop.background};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

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

const PreviewContainer = styled.div<Props>`
  margin: 10px 0;
  padding: 15px;
  border-radius: 3px;
  background-color: ${(prop) => prop.background};
`
