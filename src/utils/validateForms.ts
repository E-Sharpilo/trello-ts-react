import { FormikErrors } from 'formik';

type FormValues = {
  title: string;
};

export const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};

  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.trim().length === 0) {
    errors.title = 'cant be empty';
  }

  return errors;
};
