/**import { createServer } from "node:http";


const server = createServer((request,response)=>{
    response.write("Oi")
    return response.end()
})

server.listen(5000,()=>{
    console.log("Server running")
})**/

import { fastify } from "fastify";
//import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

// Route parameter
//const database = new DatabaseMemory();
const database = new DatabasePostgres
server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;
  console.log(description);
  await database.create({title, description,duration});
  reply.status(201).send();
});

server.get("/videos", async (request) => {
    const search = request.query.search
    const videos = await database.list(search)
    return videos
});

server.put("/videos/:id", (request, reply) => {
    const { title, description, duration } = request.body;
  const videoId = request.params.id
   database.update(videoId,{
    title,
    description,
    duration
  })
  return reply.status(204).send()
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id
  database.delete(videoId)
  reply.status(204).send()
});

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 5000,
});
