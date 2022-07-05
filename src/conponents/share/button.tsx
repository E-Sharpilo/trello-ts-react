import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${(props: any) => (props.darkblue) ? '#014a75' : 'transparent'};
  white-space: nowrap;
  padding: 0 10px;
  margin-left: 10px;
  height: 32px;
  line-height: 32px;
  border: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  &:hover{
    background-color:#4e97c2;
  }
`
const StyledArrow = styled.span`
  display: inline-block;
  margin-left: 5px;
  position: relative;
  top: 4px;
  width: 16px;
  height: 16px;
  background-image: url('./images/arrow.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`

interface Props {
  children: string
  arrow?: boolean
  darkblue?: boolean
}

export const Button: React.FC<Props> = (props: Props) => {
  return (
    <StyledButton {...props}>
      {props.children}
      {props.arrow && (
        <StyledArrow/>
      )}
    </StyledButton>
  )
}
