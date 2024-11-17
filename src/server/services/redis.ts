import { Redis } from "ioredis";

const redis = new Redis({
  host: "redis-14312.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 14312,
  password: process.env.NEXT_REDIS_PASSWORD,
});

const viewsCache = new Map<number, number>();

export async function getCacheViews(challengeId: number) {
  const views = await redis.get(`views:${challengeId}`);
  return Number(views);
}

export async function incrementCacheViews(challengeId: number) {
  // asynchronously increment views in redis
  getCacheViews(challengeId).then(async (views = 0) => {
    await redis.set(`views:${challengeId}`, views + 1);
    viewsCache.set(challengeId, views + 1);
  });

  // respond quickly with the current views, so that UI loading will not be delayed
  // if local cache is not available, return -1 (wont't respond with views till the cache is updated)
  return viewsCache.get(challengeId) ?? -1;
}
