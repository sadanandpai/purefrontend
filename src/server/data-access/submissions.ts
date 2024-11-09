import "server-only";

import { Databases, Query } from "node-appwrite";
import { createSessionClient, getUniqueID } from "../services";

export async function getSubmissionsRecords(challengeId: number) {
  const { client } = await createSessionClient();
  const databases = new Databases(client);

  return await databases.listDocuments(
    "672c61c5003770288bcd",
    "672c6704001691915536",
    [Query.equal("challengeId", challengeId)]
  );
}

export async function createSubmissionsRecord(
  challengeId: number,
  code: string,
  status: boolean
) {
  const { client } = await createSessionClient();
  const databases = new Databases(client);

  return await databases.createDocument(
    "672c61c5003770288bcd",
    "672c6704001691915536",
    getUniqueID(),
    {
      challengeId,
      code,
      status,
    }
  );
}

export async function deleteSubmissionsRecord(submissionId: string) {
  const { client } = await createSessionClient();
  const databases = new Databases(client);

  return await databases.deleteDocument(
    "672c61c5003770288bcd",
    "672c6704001691915536",
    submissionId
  );
}
