import * as yup from 'yup';

export const validate = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(5)
    .max(20, 'Password must be more then 4 symbols and less 21')
    .required('Password is required'),
});
