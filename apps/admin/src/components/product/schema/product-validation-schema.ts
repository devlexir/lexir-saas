import * as yup from "yup";

export const productValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("form:error-email-format"),
});