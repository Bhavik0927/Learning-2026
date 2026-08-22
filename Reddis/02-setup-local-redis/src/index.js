import express from "express";
import Redis from "ioredis";

const app = express();

app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.get("/redis", async (req, res) => {
  const visits = await redis.incr("visits");
  res.send(`Number of visits is ${visits}`);
});


app.listen(3020, () => {
  console.log(`Server is running on  http://localhost:3020`);
})   