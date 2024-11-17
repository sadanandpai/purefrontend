import "server-only";

import { getViews, incrementViews } from "@/server/services/redis";

export async function getIncrementedViews(challengeId: number) {
  try {
    incrementViews(challengeId);
    return getViews(challengeId);
  } catch {
    // if cache server is down, return -1
    return -1;
  }
}
