import * as Yup from "yup";

export const guestValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(40, "Name should not contain more than 40 symbols")
    .required("Please enter the name"),

  email: Yup.string()
    .trim()
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    )
    .required("Please enter the email"),

  birthDate: Yup.date()
    .required("Please select the date of birth")
    .test("age", "You must be 18 or older", function (birthDate) {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 18);
      return birthDate <= cutoff;
    }),

  source: Yup.string()
    .oneOf(["social", "friends", "myself"])
    .required("Please select one"),
});
