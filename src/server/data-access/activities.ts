import "server-only";

import { redis } from "@/server/services/redis";

export async function getViews(challengeId: number) {
  return Number(await redis.get(`views:${challengeId}`));
}

export async function getLikes(challengeId: number) {
  return Number(await redis.get(`likes:${challengeId}`));
}

export async function getAttempts(challengeId: number) {
  return Number(await redis.get(`attempts:${challengeId}`));
}

export async function getSolves(challengeId: number) {
  return Number(await redis.get(`solves:${challengeId}`));
}

export async function incrementViews(challengeId: number) {
  await redis.incr(`views:${challengeId}`);
}

export async function incrementAttempts(challengeId: number) {
  await redis.incr(`attempts:${challengeId}`);
}

export async function incrementSolves(challengeId: number) {
  await redis.incr(`solves:${challengeId}`);
}

export async function updateLikes(challengeId: number, isIncrement: boolean) {
  if (isIncrement) {
    await redis.incr(`likes:${challengeId}`);
  } else {
    await redis.decr(`likes:${challengeId}`);
  }
}
