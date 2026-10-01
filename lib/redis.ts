import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_API_URL;
if(!REDIS_URL){
  throw new Error("REDIS_API_URL is not defined in the env");
}

const redis = new Redis(REDIS_URL, {
  connectTimeout: 5000,
  maxRetriesPerRequest: 1,
  tls: {
    servername: "my-portfolio-arid-drain.cloud.layerbase.dev",
  },
});


redis.on("ready", () => {
  console.log("✅ Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});


export default redis;
