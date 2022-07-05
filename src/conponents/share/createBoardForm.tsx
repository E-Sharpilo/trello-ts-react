import { useState } from 'react'
import styled from 'styled-components'

type Props = {
  background: string
}

const styles = ['#0079BF', '#D29034', '#399839', '#FFB046', '#89609E']

export const CreateBoardForm: React.FC = () => {
  const [backgroundColor] = useState('#0079BF')
  return (
    <StyledContainer>
      <StyledTitle>Create board</StyledTitle>
      <PreviewContainer background={backgroundColor}>
        <img src='./images/board-preview.svg' alt='' />
      </PreviewContainer>
      <StyledList>
        {styles.map((item, i) => (
          <li key={i}>
            <StyledColorItem background={item}></StyledColorItem>
          </li>
        ))}
      </StyledList>

      <input type='text' />
      <button>create</button>
    </StyledContainer>
  )
}

const StyledList = styled.ul`
  display: flex;
  gap: 3px;
`

const StyledColorItem = styled.button<Props>`
  width: 40px;
  height: 32px;
  background-color: ${(prop) => prop.background};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const StyledContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTitle = styled.div`
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
