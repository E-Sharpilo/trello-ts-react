import * as yup from 'yup';

export const validate = yup.object({
  firstName: yup.string().max(30, 'Must be less then 31 symbol').required('First name is required'),
  lastName: yup.string().max(30, 'Must be less then 31 symbol').required('Last name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(5)
    .max(20, 'Password must be more then 4 symbols and less 21')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
