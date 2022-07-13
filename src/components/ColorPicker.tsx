import React from 'react'
import styled from 'styled-components'
import CheckMark from './share/icons/CheckMark'

const styles = ['#0079BF', '#D29034', '#399839', '#FFB046', '#89609E']

type bgProps = {
  background: string
}

type Props = {
  backgroundColor: string
  // eslint-disable-next-line no-unused-vars
  setBackgroundColor: (item: string) => void
}

const ColorPicker: React.FC<Props> = ({ backgroundColor, setBackgroundColor }) => {
  return (
    <List>
      {styles.map((item, i) => (
        <li key={i}>
          <ColorItem background={item} onClick={() => setBackgroundColor(item)}>
            {backgroundColor === item ? <CheckMark /> : ''}
          </ColorItem>
        </li>
      ))}
    </List>
  )
}

export default React.memo(ColorPicker)

const List = styled.ul`
  display: flex;
  gap: 3px;
`

const ColorItem = styled.button<bgProps>`
  width: 40px;
  height: 32px;
  background-color: ${(prop) => prop.background};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`
