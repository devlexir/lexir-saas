import * as yup from "yup";
export const brndValidationSchema = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .email("form:error-email-format"),
  phone: yup.string(),
  city: yup.string(),
});
