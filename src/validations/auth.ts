import * as Yup from "yup";
import { EmailRegex, UppercaseRegex, DigitRegex } from "./regex";

export const PasswordSchema = Yup.string()
  .trim()
  .min(6, "Password must be at least 8 characters long")
  .matches(
    UppercaseRegex,
    "Password must contain at least one uppercase letter"
  )
  .matches(DigitRegex, "Password must contain at least one digit")
  .required("Password is required");

export const EmailSchema = Yup.string()
  .email("Should be a valid email")
  .matches(EmailRegex, "Email should be valid")
  .required("Email is required");

export const loginSchema = Yup.object().shape({
  email: EmailSchema,
  password: PasswordSchema,
});

export const changePasswordSchema = Yup.object().shape({
  new_password: PasswordSchema,
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Confirm New Password is required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: EmailSchema,
});
