import styled from 'styled-components';

export const ArrowLeft = styled.button`
position: absolute;
top: 0;
left: 0;
width: 30px;
height: 30px;
font-size: 22px;
cursor: pointer;
border: none;
border-radius: 3px;
background-color: #fff;
transition: color 0.2s ease-out;
&::after {
  content: '❮';
  position: absolute;
  top: 50%;
  right: 30%;
  transform: translateY(-50%);
  color:  #42526e;
}
&:hover::after {
  color: #000;
}
`