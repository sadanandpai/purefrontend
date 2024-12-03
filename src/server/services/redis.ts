import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "@/server/config/redis.config";
import { serviceClient } from "./service_client";



export const REDIS_VIEWS_CACHE = new Map<number, number>();

export async function getViews(challengeId: number) {
  return REDIS_VIEWS_CACHE.get(challengeId);
}

export async function incrementViews(challengeId: number) {
  await serviceClient.cache().incr(`views:${challengeId}`);
  REDIS_VIEWS_CACHE.set(
    challengeId,
    Number(await serviceClient.cache().get(`views:${challengeId}`))
  );
}


export class RedisClient {
  private static instance: RedisClient | null = null;
  public redisInstance: Redis;

  private constructor() {
    this.redisInstance = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: process.env.NEXT_REDIS_PASSWORD,
    });
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }
}