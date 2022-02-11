import * as yup from "yup";

const detailsSchema = yup.object().shape({
  displayName: yup.string().required("Please enter a display name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  mobile: yup.string().nullable(),
  team: yup.string().nullable(),
  message: yup.string().nullable(),
});

export default detailsSchema;
