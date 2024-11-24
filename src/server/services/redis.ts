import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "@/server/config/redis.config";

export const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: process.env.NEXT_REDIS_PASSWORD,
});
