import "server-only";

import { Databases, Query } from "node-appwrite";
import { createSessionClient, getUniqueID } from "@/server/services";
import { DB, SUBMISSIONS_COLLECTION } from "@/server/config/server";

export async function getSubmissionsRecords(challengeId: number) {
  const { client } = await createSessionClient();
  const databases = new Databases(client);

  return await databases.listDocuments(DB, SUBMISSIONS_COLLECTION, [
    Query.equal("cId", challengeId),
  ]);
}

export async function createSubmissionsRecord(
  challengeId: number,
  code: string,
  status: boolean
) {
  const { client } = await createSessionClient();
  const databases = new Databases(client);

  return await databases.createDocument(
    DB,
    SUBMISSIONS_COLLECTION,
    getUniqueID(),
    {
      cId: challengeId,
      code,
      status,
    }
  );
}

export async function deleteSubmissionsRecord(submissionId: string) {
  const { client } = await createSessionClient();
  const databases = new Databases(client);

  return await databases.deleteDocument(
    DB,
    SUBMISSIONS_COLLECTION,
    submissionId
  );
}
