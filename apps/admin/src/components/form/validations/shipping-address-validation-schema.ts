import * as yup from 'yup';

export const ShippingAddressValidationSchema = yup.object().shape({
  address_nickname: yup.string().required('Address Nickname is required!'),
  shipping_address: yup.string().required('Address is required!'),
  shipping_address2: yup.string(),
  shipping_city: yup.string().required('City is required!'),
  shipping_country: yup.string().required('Country is required!'),
  shipping_zip: yup.string().required('Zip/ Postal Code is required!'),
});
