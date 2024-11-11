import "server-only";

import {
  createAdminClient,
  createSessionClient,
  getUniqueID,
} from "@/server/services";
import { getOAuthProvider } from "../services/appwrite";
import { respondWithDataAccessError } from "../handlers/data-access";

export async function getSession() {
  const { account } = await createSessionClient();
  return await account.get();
}

export async function createSessionWithEmail(email: string, password: string) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    return session.secret;
  } catch (error) {
    respondWithDataAccessError(error);
  }
}

export async function createSessionWithSecret(userId: string, secret: string) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(userId, secret);
    return session.secret;
  } catch (error) {
    respondWithDataAccessError(error);
  }
}

export async function redirectToOAuth(origin: string | null) {
  const { account } = await createAdminClient();
  return await account.createOAuth2Token(
    getOAuthProvider().Google,
    `${origin}/oauth`,
    `${origin}/signin`
  );
}

export async function initiateSessionWithEmail(
  name: string,
  email: string,
  password: string
) {
  try {
    const { account } = await createAdminClient();
    await account.create(getUniqueID(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);
    return session.secret;
  } catch (error) {
    respondWithDataAccessError(error);
  }
}

export async function destroySession() {
  const { account } = await createSessionClient();
  await account.deleteSession("current");
}

export async function updateSessionPassword(
  password: string,
  oldPassword: string
) {
  try {
    const { account } = await createSessionClient();
    await account.updatePassword(password.toString(), oldPassword.toString());
  } catch (error) {
    respondWithDataAccessError(error);
  }
}

export async function updateFullName(name: string) {
  try {
    const { account } = await createSessionClient();
    await account.updateName(name);
  } catch (error) {
    respondWithDataAccessError(error);
  }
}

export async function updateUserEmail(email: string, password: string) {
  try {
    const { account } = await createSessionClient();
    await account.updateEmail(email, password);
  } catch (error) {
    respondWithDataAccessError(error);
  }
}
