const redis = require("redis");

const RedisStore = require("connect-redis").default;
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
}); //Configure session middleware

let redisStore = new RedisStore({
  client: redisClient,
  ttl: 30,
});
console.log("redisStore init");
module.exports = redisStore;
