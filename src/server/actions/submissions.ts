"use server";

import {
  createSubmissionsRecord,
  getSubmissionsRecords,
} from "@/server/data-access/submissions";

export async function getUserSubmissions() {
  return await getSubmissionsRecords();
}

export async function submitUserSubmission(challengeId: number, code: string) {
  return await createSubmissionsRecord(challengeId, code, true);
}
