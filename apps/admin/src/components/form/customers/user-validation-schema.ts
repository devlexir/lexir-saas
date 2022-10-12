import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  account_name: yup.string(),
  first_name: yup.string(),
  last_name: yup.string(),
  city: yup.string(),
  phone_number: yup.string(),
  email: yup.string().email(),


});
