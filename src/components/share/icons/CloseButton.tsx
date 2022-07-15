import styled from 'styled-components';

export const CloseButton = styled.button`
position: absolute;
top: 0;
right: 0;
width: 30px;
height: 30px;
font-size: 30px;
line-height: 30px;
cursor: pointer;
border: none;
border-radius: 3px;
background-color: #fff;
transition: color 0.2s ease-out;
&::after {
  content: '×';
  position: absolute;
  top: 0;
  right: 5px;
  color:  #42526e;
}
&:hover::after {
  color: #000;
}
`