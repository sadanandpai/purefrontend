"use server";

import { challenges } from "@/data/challenges";
import {
  createSubmissionsRecord,
  deleteSubmissionsRecord,
  getSubmissionsRecords,
} from "@/server/data-access/submissions";

export async function getUserSubmissions(challengeId: number) {
  if (
    typeof challengeId !== "number" ||
    challengeId <= 0 ||
    challengeId > challenges.length
  ) {
    throw new Error("Invalid challenge ID");
  }

  return await getSubmissionsRecords(challengeId);
}

export async function submitUserSubmission(
  challengeId: number,
  code: string,
  status: boolean
) {
  if (
    typeof challengeId !== "number" ||
    challengeId <= 0 ||
    challengeId > challenges.length
  ) {
    throw new Error("Invalid challenge ID");
  }

  const userCode = code.trim();
  if (typeof code !== "string" || userCode === "" || userCode.length > 1000) {
    throw new Error("Code length exceeds limit");
  }

  return await createSubmissionsRecord(challengeId, code, status);
}

export async function deleteUserSubmission(submissionId: string) {
  return await deleteSubmissionsRecord(submissionId);
}
