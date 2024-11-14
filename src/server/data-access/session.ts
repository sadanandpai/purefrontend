import "server-only";

import {
  createAdminClient,
  createSessionClient,
  getUniqueID,
} from "@/server/services";
import { routes } from "@/common/routes";
import { createClient, getOAuthProvider } from "@/server/services/appwrite";
import { respondWithDataAccessError } from "@/server/handlers/data-access";
import { HOST_URL } from "@/server/config/server";

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

export async function sendVerificationEmail() {
  try {
    const { account } = await createSessionClient();
    await account.createVerification(`${HOST_URL}${routes.verifyEmail}`);
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

export async function sendPasswordRecoveryEmail(email: string) {
  try {
    const { account } = createClient();
    await account.createRecovery(email, `${HOST_URL}${routes.resetPassword}`);
  } catch (error) {
    respondWithDataAccessError(error);
  }
}

export async function resetPassword(
  userId: string,
  secret: string,
  password: string
) {
  try {
    const { account } = createClient();
    await account.updateRecovery(userId, secret, password);
  } catch (error) {
    respondWithDataAccessError(error);
  }
}
