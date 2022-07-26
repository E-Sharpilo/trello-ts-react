import React from 'react'
import styled from 'styled-components'
import ArrowSvg from './icons/ArrowDownSvg'

interface Props {
  children: React.ReactNode
  arrow?: boolean
  background?: string
  onClick?: () => void
  type: string
  form?: string
  disabled?: boolean
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
  background-color: ${(props) => (props.background ? props.background : 'transparent')};
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
  }
`
