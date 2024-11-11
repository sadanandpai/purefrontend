import {
  signInSchema,
  signUpSchema,
  updateEmailSchema,
  updateNameSchema,
  updatePasswordSchema,
} from "@/server/definitions/auth";
import { respondWithValidationError } from "@/server/handlers/validation";

export function validateSignIn(formData: FormData) {
  try {
    return signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    respondWithValidationError(error);
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
    respondWithValidationError(error);
  }
}

export function validatePassword(formData: FormData) {
  try {
    return updatePasswordSchema.parse({
      password: formData.get("password"),
      newPassword: formData.get("newPassword"),
    });
  } catch (error) {
    respondWithValidationError(error);
  }
}

export function validateName(formData: FormData) {
  try {
    return updateNameSchema.parse({
      name: formData.get("name"),
    });
  } catch (error) {
    respondWithValidationError(error);
  }
}

export function validateEmail(formData: FormData) {
  try {
    return updateEmailSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    respondWithValidationError(error);
  }
}
