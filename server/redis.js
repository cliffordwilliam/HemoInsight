const Redis = require("ioredis");

const redis = new Redis({
  port: 10733,
  host: "redis-10733.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("OK Connect to Redis");
});

redis.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = redis;
