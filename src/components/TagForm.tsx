/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';
import Button from './share/Button';
import { ArrowLeft } from './share/icons/ArrowLeft';
import { FormState } from './TagsPicker';

type Props = {
  colors: string[];
  color: string;
  title: string;
  formState: string;
  setColor: (color: string) => void;
  setNewTitle: (title: string) => void;
  setEditTitle: (title: string) => void;
  createTag: () => void;
  setDefaultForm: () => void;
  updateTag: () => void;
  toggleModal: () => void;
};

const CreateTagForm: React.FC<Props> = ({
  formState,
  colors,
  color,
  title,
  setColor,
  setNewTitle,
  createTag,
  setDefaultForm,
  updateTag,
  setEditTitle,
  toggleModal,
}) => {
  const inputHandle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (formState === FormState.Create) {
        setNewTitle(event.target.value);
      } else {
        setEditTitle(event.target.value);
      }
    },
    [setNewTitle, setEditTitle],
  );

  const submitHandle = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formState === FormState.Create) {
        createTag();
      } else {
        updateTag();
      }
    },
    [createTag, updateTag],
  );

  return (
    <Root>
      <Wrapper>
        <ArrowLeft onClick={setDefaultForm} />
      </Wrapper>
      <Title>{formState === FormState.Create ? 'Create Tag' : 'Edit Tag'}</Title>
      <form
        id={formState}
        onSubmit={submitHandle}
      >
        <Label>Title</Label>
        <Input
          onChange={inputHandle}
          value={title}
        />
      </form>
      <ColorPicker
        backgroundColor={color}
        colors={colors}
        setBackgroundColor={setColor}
      />
      <BtnGroup>
        <Button
          type='button'
          background='#0079bf'
          form={formState}
        >
          {formState === FormState.Create ? 'Create Tag' : 'Edit Tag'}
        </Button>
        {formState === FormState.Editing && (
          <Button
            type='button'
            background='#b04632'
            onClick={toggleModal}
          >
            Delete
          </Button>
        )}
      </BtnGroup>
    </Root>
  );
};

export default React.memo(CreateTagForm);

const Label = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin: 10px 0;
`;

const Title = styled.div`
  padding: 5px 40px;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  line-height: 24px;
  text-align: center;
`;

const Root = styled.div``;

const Wrapper = styled.div`
  position: absolute;
`;
const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
