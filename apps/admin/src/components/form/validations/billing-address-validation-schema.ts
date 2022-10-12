import * as yup from 'yup';

export const BillingAddressValidationSchema = yup.object().shape({
  billing_name: yup.string().required('Billing Name is required'),
  billing_address_nickname: yup
    .string()
    .required('Address Nickname is required'),
  billing_address: yup.string().required('Shipping Address is required'),
  billing_address2: yup.string(),
  billing_city: yup.string().required('City is required'),
  billing_country: yup.string().required('Country is required'),
  billing_zip: yup.string().required('Zip/ Postal Code is required'),
});
