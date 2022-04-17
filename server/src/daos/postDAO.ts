import db from "../configs/db"
import { v4 as uuid } from "uuid"

class PostDAO {
  async createPost(title: string, content: string): Promise<string> {
    const [id] = await db("post")
      .insert({
        id: uuid(),
        title,
        content
      })
      .returning("id")

    return id
  }
}

export default new PostDAO()
