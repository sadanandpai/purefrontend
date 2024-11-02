import "server-only";

import { OAuthProvider } from "node-appwrite";
import {
  createAdminClient,
  createSessionClient,
  getUniqueID,
} from "@/lib/server/service";
import { ActionError } from "@/lib/common/error";

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
    if (error instanceof Error) {
      throw new ActionError({
        error: error.message,
      });
    }

    throw error;
  }
}

export async function createSessionWithSecret(userId: string, secret: string) {
  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);
  return session.secret;
}

export async function redirectToOAuth(origin: string | null) {
  const { account } = await createAdminClient();
  return await account.createOAuth2Token(
    OAuthProvider.Google,
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
    if (error instanceof Error) {
      throw new ActionError({
        error: error.message,
      });
    }

    throw error;
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
  const { account } = await createSessionClient();
  await account.updatePassword(password.toString(), oldPassword.toString());
}
