import React from 'react';
import styled from 'styled-components';
import CheckMark from './share/icons/CheckMark';

type bgProps = {
  background: string;
};

type Props = {
  backgroundColor: string;
  colors: string[];
  // eslint-disable-next-line no-unused-vars
  setBackgroundColor: (item: string) => void;
};

const ColorPicker: React.FC<Props> = ({ backgroundColor, setBackgroundColor, colors }) => {
  return (
    <List>
      {colors.map((item, i) => (
        <li key={i}>
          <ColorItem
            background={item}
            onClick={() => setBackgroundColor(item)}
          >
            {backgroundColor === item ? <CheckMark /> : ''}
          </ColorItem>
        </li>
      ))}
    </List>
  );
};

export default React.memo(ColorPicker);

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  vertical-align: middle;
  justify-content: space-between;
`;

const ColorItem = styled.button<bgProps>`
  width: 40px;
  height: 32px;
  background-color: ${(prop) => prop.background};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
