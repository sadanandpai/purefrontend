"use server";

import {
  createSubmissionsRecord,
  getSubmissionsRecords,
} from "@/server/data-access/submissions";

export async function getUserSubmissions(challengeId: number) {
  return await getSubmissionsRecords(challengeId);
}

export async function submitUserSubmission(challengeId: number, code: string) {
  return await createSubmissionsRecord(challengeId, code, true);
}
