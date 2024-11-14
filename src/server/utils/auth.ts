import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  updateNameSchema,
  updatePasswordSchema,
} from "@/server/definitions/auth";
import { respondWithValidationError } from "@/server/handlers/validation";

export function validateEmailPassword(formData: FormData) {
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
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
    });
  } catch (error) {
    respondWithValidationError(error);
  }
}

export function validateResetPassword(formData: FormData) {
  try {
    return resetPasswordSchema.parse({
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
      userId: formData.get("userId"),
      secret: formData.get("secret"),
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
    return forgotPasswordSchema.parse({
      email: formData.get("email"),
    });
  } catch (error) {
    respondWithValidationError(error);
  }
}
