import "server-only";

import { redis, incrementViews, getViews } from "@/server/services/redis";

export async function getIncrementedViews(challengeId: number) {
  try {
    incrementViews(challengeId);
    return getViews(challengeId) ?? -1;
  } catch {
    // if cache server is down, return -1
    return -1;
  }
}

export async function modifyLikes(challengeId: number, isIncrement: boolean) {
  if (isIncrement) {
    await redis.incr(`likes:${challengeId}`);
  } else {
    await redis.decr(`likes:${challengeId}`);
  }
}
