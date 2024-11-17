"use server";

import { redirect, RedirectType } from "next/navigation";
import { COOKIE_NAME } from "@/server/config/server.config";
import {
  getSession,
  createSessionWithEmail,
  redirectToOAuth,
  destroySession,
  initiateSessionWithEmail,
  updateSessionPassword,
  updateFullName,
  updateUserEmail,
  sendVerificationEmail,
  sendPasswordRecoveryEmail,
  resetPassword,
} from "@/server/data-access/session";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateEmailPassword,
  validateSignUp,
  validateResetPassword,
} from "@/server/utils/auth";
import { headers } from "next/headers";
import { routes } from "@/common/routes";
import { createCookie, deleteCookie } from "@/server/utils/cookies";
import { GlobalError, GlobalResponse } from "@/common/types/globals";
import { respondWithError, respondWithSuccess } from "@/server/handlers/action";

export async function signInWithEmail(
  _prev: GlobalResponse,
  formData: FormData
) {
  try {
    const { email, password } = validateEmailPassword(formData);
    const secret = await createSessionWithEmail(email, password);
    await createCookie(COOKIE_NAME, secret);
    redirect(`${routes.profile}?auth=true`, RedirectType.replace);
  } catch (error) {
    return respondWithError(error);
  }
}

export async function signInWithGoogle() {
  const reqHeaders = await headers();
  const origin = reqHeaders.get("origin");
  const redirectUrl = await redirectToOAuth(origin);
  redirect(redirectUrl);
}

export async function signUpWithEmail(
  _prev: GlobalResponse,
  formData: FormData
) {
  try {
    const { name, email, password } = validateSignUp(formData);
    const secret = await initiateSessionWithEmail(name, email, password);
    await createCookie(COOKIE_NAME, secret);
    await sendVerificationEmail();
    redirect(`${routes.profile}?auth=true`, RedirectType.replace);
  } catch (error) {
    return respondWithError(error);
  }
}

export async function signOut() {
  destroySession();
  deleteCookie(COOKIE_NAME);
  redirect(`${routes.signIn}?auth=false`, RedirectType.replace);
}

export async function updatePassword(
  _prev: GlobalResponse,
  formData: FormData
) {
  try {
    const { currentPassword, newPassword } = validatePassword(formData);
    await updateSessionPassword(newPassword, currentPassword);
    return respondWithSuccess("Password updated successfully");
  } catch (error) {
    return respondWithError(error);
  }
}

export async function updateName(_prev: GlobalResponse, formData: FormData) {
  try {
    const { name } = validateName(formData);
    await updateFullName(name);
    return respondWithSuccess("Name updated successfully");
  } catch (error) {
    return respondWithError(error);
  }
}

export async function updateEmail(_prev: GlobalResponse, formData: FormData) {
  try {
    const { email, password } = validateEmailPassword(formData);
    await updateUserEmail(email, password);
    return respondWithSuccess("Email updated successfully");
  } catch (error) {
    return respondWithError(error);
  }
}

export async function forgotPassword(
  _prev: GlobalResponse,
  formData: FormData
) {
  try {
    const { email } = validateEmail(formData);
    await sendPasswordRecoveryEmail(email);
    return respondWithSuccess("Reset link sent to your email");
  } catch (error) {
    return respondWithError(error);
  }
}

export async function resetForgotPassword(
  _prev: GlobalResponse,
  formData: FormData
) {
  try {
    const { userId, secret, newPassword, confirmPassword } =
      validateResetPassword(formData);
    if (newPassword !== confirmPassword) {
      return respondWithError(
        new GlobalError({
          error: "Passwords do not match",
        })
      );
    }

    await resetPassword(userId, secret, newPassword);
    return respondWithSuccess("Password reset successfully");
  } catch (error) {
    return respondWithError(error);
  }
}

export async function sendVerificationEmailAction() {
  const session = await getLoggedInUser();

  if (!session) {
    throw "User not logged in";
  }

  if (session.emailVerification) {
    throw "Email already verified. Please refresh the page";
  }

  await sendVerificationEmail();
  return respondWithSuccess("Verification email sent");
}

export async function getLoggedInUser() {
  try {
    return await getSession();
  } catch {
    return null;
  }
}
