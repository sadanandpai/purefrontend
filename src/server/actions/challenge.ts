"use server";

import {
  createChallengeInfo,
  readUserChallengeInfo,
  updateUserChallengeInfo,
} from "@/server/data-access/challenge";
import { isValidChallengeId } from "../utils/challenge";
import { getLoggedInUser } from "./auth";

export async function getUserChallengeInfo(challengeId: number) {
  if ((await getLoggedInUser()) === null) {
    return { liked: null, bookmarked: null, completed: null };
  }

  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  return await readUserChallengeInfo(challengeId);
}

export async function setUserChallengeInfo(
  challengeId: number,
  data: Partial<{ liked: boolean; bookmarked: boolean; completed: boolean }>
) {
  if (!isValidChallengeId(challengeId)) {
    throw new Error("Invalid challenge ID");
  }

  const document = await readUserChallengeInfo(challengeId);

  if (document) {
    return await updateUserChallengeInfo(document.$id, challengeId, data);
  } else {
    return await createChallengeInfo(challengeId, data);
  }
}
