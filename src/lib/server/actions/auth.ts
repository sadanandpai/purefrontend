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
} from "@/lib/server/data-layer/session";
import {
  validatePassword,
  validateSignIn,
  validateSignUp,
} from "@/lib/server/utils/auth";
import { routes } from "@/lib/common/routes";
import { createCookie, deleteCookie } from "../utils/cookies";
import { headers } from "next/headers";
import { respondWithError, respondWithSuccess } from "../handlers/action";
import { GlobalResponse } from "@/lib/common/types/globals";

export async function signInWithEmail(
  _prev: GlobalResponse,
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
    await createCookie(cookieName, secret);
    redirect(routes.profile);
  } catch (error) {
    return respondWithError(error);
  }
}

export async function signOut() {
  destroySession();
  deleteCookie(cookieName);
  redirect(routes.signIn);
}

export async function updatePassword(
  _prev: GlobalResponse,
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
  } catch {
    return null;
  }
}
