import React from 'react'
import styled from 'styled-components'
import ArrowSvg from './icons/ArrowSvg'

interface Props {
  children: React.ReactNode
  arrow?: boolean
  color?: string
  onClick?: () => void
  type: string
}

const Button: React.FC<Props> = (props: Props) => {
  return (
    <StyledButton {...props} type='submit'>
      {props.children}
      {props.arrow && <ArrowSvg />}
    </StyledButton>
  )
}

export default React.memo(Button)

const StyledButton = styled.button<Props>`
  background-color: ${(props) => (props.color ? props.color : 'transparent')};
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 10px;
  height: 32px;
  line-height: 32px;
  border: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #4e97c2;
  }
`
