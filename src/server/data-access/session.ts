import "server-only";

import { routes } from "@/common/routes";
import { HOST_URL } from "@/server/config/server.config";
import {
  createClient,
  getOAuthProvider,
  createAdminClient,
  createSessionClient,
  getUniqueID,
  oAuthProvidersType,
} from "@/server/services/appwrite";

export async function getSession() {
  const { account } = await createSessionClient();
  return await account.get();
}

export async function createSessionWithEmail(email: string, password: string) {
  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);
  return session.secret;
}

export async function createSessionWithSecret(userId: string, secret: string) {
  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);
  return session.secret;
}

export async function redirectToOAuth(
  origin: string | null,
  provider: oAuthProvidersType
) {
  const { account } = await createAdminClient();

  return await account.createOAuth2Token(
    getOAuthProvider(provider),
    `${origin}/oauth`,
    `${origin}/signin`
  );
}

export async function initiateSessionWithEmail(
  name: string,
  email: string,
  password: string
) {
  const { account } = await createAdminClient();
  await account.create(getUniqueID(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);
  return session.secret;
}

export async function sendVerificationEmail() {
  const { account } = await createSessionClient();
  await account.createVerification(`${HOST_URL}${routes.verifyEmail}`);
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

export async function updateFullName(name: string) {
  const { account } = await createSessionClient();
  await account.updateName(name);
}

export async function updateUserEmail(email: string, password: string) {
  const { account } = await createSessionClient();
  await account.updateEmail(email, password);
}

export async function sendPasswordRecoveryEmail(email: string) {
  const { account } = createClient();
  await account.createRecovery(email, `${HOST_URL}${routes.resetPassword}`);
}

export async function resetPassword(
  userId: string,
  secret: string,
  password: string
) {
  const { account } = createClient();
  await account.updateRecovery(userId, secret, password);
}

export async function updatePhoneNumber(phone: string, password: string) {
  const { account } = await createSessionClient();
  await account.updatePhone(phone, password);
}

export async function sendPhoneVerification() {
  const { account } = await createSessionClient();
  await account.createPhoneVerification();
}

export async function verifyPhoneNumber(otp: string) {
  const { account } = await createSessionClient();
  const session = await getSession();
  await account.updatePhoneVerification(session.$id, otp);
}
