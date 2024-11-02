"use server";

import { redirect } from "next/navigation";
import { cookieName } from "@/lib/server/config/auth";
import {
  getSession,
  createSessionWithEmail,
  redirectToOAuth,
  destroySession,
  initiateSessionWithEmail,
  updateSessionPassword,
} from "@/lib/server/controller/session";
import {
  validatePassword,
  validateSignIn,
  validateSignUp,
} from "@/lib/server/utils/auth";
import { routes } from "@/lib/common/routes";
import { createCookie, deleteCookie } from "../utils/cookies";
import { ActionErrorType } from "@/lib/common/error";
import { headers } from "next/headers";
import {
  ActionResponse,
  respondWithError,
  respondWithSuccess,
} from "../handlers/action";

export async function signInWithEmail(
  _prev: ActionResponse,
  formData: FormData
) {
  try {
    const { email, password } = validateSignIn(formData);
    const secret = await createSessionWithEmail(email, password);
    await createCookie(cookieName, secret);
    redirect(routes.profile);
  } catch (error) {
    return respondWithError(error);
  }
}

export async function signInWithGoogle() {
  try {
    const reqHeaders = await headers();
    const origin = reqHeaders.get("origin");
    const redirectUrl = await redirectToOAuth(origin);
    redirect(redirectUrl);
  } catch (error) {
    return respondWithError(error);
  }
}

export async function signUpWithEmail(
  _prev: ActionResponse,
  formData: FormData
) {
  try {
    const { name, email, password } = validateSignUp(formData);
    const secret = await initiateSessionWithEmail(name, email, password);
    await createCookie(cookieName, secret);
    redirect(routes.profile);
  } catch (error) {
    return respondWithError(error);
  }
}

export async function signOut() {
  try {
    destroySession();
    deleteCookie(cookieName);
    redirect(routes.signIn);
  } catch (error) {
    return respondWithError(error);
  }
}

export async function updatePassword(
  _prev: ActionResponse,
  formData: FormData
) {
  try {
    const { password, newPassword } = validatePassword(formData);
    await updateSessionPassword(newPassword, password);
    return respondWithSuccess("Password updated successfully");
  } catch (error) {
    return respondWithError(error);
  }
}

export async function getLoggedInUser() {
  try {
    return await getSession();
  } catch (error) {
    return null;
  }
}
