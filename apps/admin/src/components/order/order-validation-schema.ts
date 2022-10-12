import * as yup from "yup";
export const customerValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
  email: yup
    .string()
    .email("form:error-email-format")
    .required("form:error-email-required"),
  phone: yup.string().required("form:error-phone-required"),
  city: yup.string().required("form:error-phone-required"),
});
