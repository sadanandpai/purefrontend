"use server";

import {
  getAttempts,
  incrementAttempts,
} from "@/server/data-access/activities";
import { isValidChallengeId } from "@/server/utils/challenge";

export async function getChallengeAttempts(challengeId: number) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return await getAttempts(challengeId);
}

export async function incrementChallengeAttempts(challengeId: number) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return await incrementAttempts(challengeId);
}
