import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
 
  async list(search) {
    let videos

    if (search) {
      videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
    } else {
      videos = await sql`select * from videos`
    }

    return videos
  }

  async create(video) {
    const { title, description, duration } = video;
    const videoid = randomUUID();
    await sql`insert into videos (id,title,description,duration)
    VALUES(${videoid},${title},${description},${duration});`;
  }

  async update(id, videos) {
    
    const { title, description ,duration } = videos

    await sql`update videos SET title=${title},description=${description},duration=${duration} WHERE id=${id}`

  }

  async delete(id) {

    await sql`delete from videos where id=${id} `

  }
}
