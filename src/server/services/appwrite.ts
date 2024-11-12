import "server-only";

import { Client, Account, ID, OAuthProvider } from "node-appwrite";
import { COOKIE_NAME } from "@/server/config/server";
import { getCookie } from "@/server/utils/cookies";

export function getUniqueID() {
  return ID.unique();
}

export function getOAuthProvider() {
  return OAuthProvider;
}

export function createClient() {
  if (
    !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    !process.env.NEXT_PUBLIC_APPWRITE_PROJECT
  ) {
    throw new Error("Appwrite endpoint or project not provided");
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  return {
    get account() {
      return new Account(client);
    },
    get client() {
      return client;
    },
  };
}

export async function createSessionClient() {
  if (
    !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    !process.env.NEXT_PUBLIC_APPWRITE_PROJECT
  ) {
    throw new Error("Appwrite endpoint or project not provided");
  }

  const sessionCookie = await getCookie(COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) {
    throw new Error("No session");
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setSession(sessionCookie.value);

  return {
    get account() {
      return new Account(client);
    },
    get client() {
      return client;
    },
  };
}

export async function createAdminClient() {
  if (
    !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    !process.env.NEXT_PUBLIC_APPWRITE_PROJECT ||
    !process.env.NEXT_APPWRITE_KEY
  ) {
    throw new Error("Appwrite endpoint or project or key not provided");
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get client() {
      return client;
    },
  };
}
