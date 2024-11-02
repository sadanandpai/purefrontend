import {
  signInSchema,
  signUpSchema,
  updatePasswordSchema,
} from "@/lib/server/definitions/auth";
import { handleValidationError } from "../handlers/validation";

export function validateSignIn(formData: FormData) {
  try {
    return signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    handleValidationError(error);
  }
}

export function validateSignUp(formData: FormData) {
  try {
    return signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    handleValidationError(error);
  }
}

export function validatePassword(formData: FormData) {
  try {
    return updatePasswordSchema.parse({
      password: formData.get("password"),
      newPassword: formData.get("newPassword"),
    });
  } catch (error) {
    handleValidationError(error);
  }
}
