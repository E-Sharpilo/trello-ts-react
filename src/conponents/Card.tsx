import styled from 'styled-components'

type Props = {
  title: string
}

export const Card: React.FC<Props> = ({title}) => {
  return (
    <StyledCard>{title}</StyledCard>
  )
}

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  min-height: 30px;
  padding: 8px;
`