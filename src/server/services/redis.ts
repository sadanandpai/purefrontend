import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "../config/redis.config";

export const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: process.env.NEXT_REDIS_PASSWORD,
});

export const REDIS_VIEWS_CACHE = new Map<number, number>();

export async function getViews(challengeId: number) {
  return REDIS_VIEWS_CACHE.get(challengeId);
}

export async function incrementViews(challengeId: number) {
  const redisViews = await redis.get(`views:${challengeId}`);
  const views = Number(redisViews) ?? 0;
  await redis.set(`views:${challengeId}`, views + 1);
  REDIS_VIEWS_CACHE.set(challengeId, views + 1);
}
