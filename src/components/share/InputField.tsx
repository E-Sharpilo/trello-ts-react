import { useField, ErrorMessage } from 'formik';
import styled from 'styled-components';

type Props = {
  name: string;
  label: string;
  type: string;
};

type StyledProps = {
  border: string;
};

export const InputField: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={field.name}>{label}</label>
      <Input
        autoComplete='off'
        {...field}
        {...props}
        border={meta.touched && meta.error ? '1px solid red' : ''}
      />
      <StyledErrorMassage
        component='div'
        name={field.name}
      />
    </>
  );
};

const Input = styled.input<StyledProps>`
  width: 100%;
  height: 35px;
  padding: 5px;
  border: ${(props) => props.border || '1px solid #000000'};
  border-radius: 3px;
`;
const StyledErrorMassage = styled(ErrorMessage)`
  color: #e60505;
`;
