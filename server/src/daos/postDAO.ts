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

  async getPost(id: string): Promise<[string, string]> {
    const [title, content] = await db("post")
      .where({ id })
      .select("title", "content")

    return [title, content]
  }
}

export default new PostDAO()
