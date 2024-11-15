import { Redis } from "ioredis";

export const redis = new Redis({
  host: "redis-17396.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 17396,
  password: process.env.NEXT_REDIS_PASSWORD,
});

export async function getCacheViews(challengeId: number) {
  const views = await redis.get(`views:${challengeId}`);
  return Number(views);
}

export async function incrementCacheViews(challengeId: number) {
  const views = await getCacheViews(challengeId);
  await redis.set(`views:${challengeId}`, views + 1);
  return views + 1;
}
