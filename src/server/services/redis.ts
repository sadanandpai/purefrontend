import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "@/server/config/redis.config";

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
  await redis.incr(`views:${challengeId}`);
  REDIS_VIEWS_CACHE.set(
    challengeId,
    Number(await redis.get(`views:${challengeId}`))
  );
}
