import "server-only";

import { incrementCacheViews } from "@/server/services/redis";

export async function getIncrementedViews(challengeId: number) {
  try {
    return await incrementCacheViews(challengeId);
  } catch {
    // if cache server is down, return -1
    return -1;
  }
}
