"use server";

import { redirect, RedirectType } from "next/navigation";
import { COOKIE_NAME } from "@/server/config/server.config";
import {
  getSession,
  createSessionWithEmail,
  redirectToOAuth,
  destroySession,
  initiateSessionWithEmail,
  sendVerificationEmail,
} from "@/server/data-access/session";
import { validateEmailPassword, validateSignUp } from "@/server/utils/auth";
import { headers } from "next/headers";
import { routes } from "@/common/routes";
import { createCookie, deleteCookie } from "@/server/utils/cookies";
import { GlobalResponse, respondWithError } from "@/server/handlers/action";

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

export async function signInWithOAuth(provider: "Google" | "Github") {
  const reqHeaders = await headers();
  const origin = reqHeaders.get("origin");
  const redirectUrl = await redirectToOAuth(origin, provider);
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

export async function getLoggedInUser() {
  try {
    return await getSession();
  } catch {
    return null;
  }
}
