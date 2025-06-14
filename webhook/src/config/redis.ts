import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redisClient.on("connect", () => {
  console.log("Successfully connected to Redis");
});

// Set a value in a hash
export const setRedis = async <T>(master: string, key: string, value: T): Promise<void> => {
  await redisClient.hset(master, key, JSON.stringify(value));
};

// Get a value from a hash
export const getRedis = async <T>(master: string, key: string): Promise<T | null> => {
  const data = await redisClient.hget(master, key);
  return data ? JSON.parse(data) : null;
};

// Delete a key from a hash or the entire hash
export const delRedis = async (master: string, key?: string): Promise<void> => {
  if (key) {
    await redisClient.hdel(master, key);
  } else {
    await redisClient.del(master);
  }
};

// Set a value with expiration
export const setRedisEx = async <T>(key: string, value: T, time: number): Promise<void> => {
  await redisClient.setex(key, time, JSON.stringify(value));
};

// Get a value with expiration
export const getRedisEx = async <T>(key: string): Promise<T | null> => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

// Delete a key
export const delRedisEx = async (key: string): Promise<void> => {
  await redisClient.del(key);
};

export default redisClient;