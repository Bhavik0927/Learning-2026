import express, { json } from 'express';
import Redis from 'ioredis';

const app = express();

app.use(express.json());

const redis = new Redis(process.env.Redis_URL || 'redis://localhost:6379');


app.post('/user/:id/json', async(req,res) =>{
    await redis.set(`user:${req.params.id}:json`, JSON.stringify(req.body));

    res.send({ savedAS: "json"});
});


app.get('/user/:id/json', async(req,res) =>{
    const raw = await redis.get(`user:${req.params.id}:json`);
    res.send({ user: raw ?  JSON.parse(raw) : null });
})


app.post('/user/:id/hash', async(req,res) =>{
    await redis.hset(`user:${req.params.id}:hash`, req.body);
    res.send({ savedAS: "hash"})
})


app.get('/user/:id/hash', async(req,res) =>{
    const data = await redis.hgetall(`user:${req.params.id}:hash`);
    res.send({ user: data });
})



app.listen(3202,() =>{
    console.log(`Server is listening on http://localhost:3202`)
});