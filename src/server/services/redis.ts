import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "../config/redis.config";

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: process.env.NEXT_REDIS_PASSWORD,
});

const REDIS_VIEWS_CACHE = new Map<number, number>();

async function getRedisViews(challengeId: number) {
  const views = await redis.get(`views:${challengeId}`);
  return Number(views);
}

export function incrementViews(challengeId: number) {
  // asynchronously increment views in redis
  getRedisViews(challengeId).then(async (views = 0) => {
    await redis.set(`views:${challengeId}`, views + 1);
    REDIS_VIEWS_CACHE.set(challengeId, views + 1);
  });
}

export async function getViews(challengeId: number) {
  // respond quickly with the current views, so that UI loading will not be delayed
  // if local cache is not available, return -1 (wont't respond with views till the cache is updated)
  return REDIS_VIEWS_CACHE.get(challengeId) ?? -1;
}
