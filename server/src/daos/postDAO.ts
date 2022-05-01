import db from "../configs/db"
import idGenerator from "../utils/idGenerator"
import postDTO from "../models/postDTO"

class PostDAO {
  async createPost(title: string, content: string): Promise<string> {
    const id = idGenerator()

    const [postID] = await db("post")
      .insert({
        id,
        title,
        content
      })
      .returning("id")

    return postID
  }

  async getPost(id: string): Promise<postDTO[]> {
    return await db("post").where({ id }).select("title", "content")
  }
}

export default new PostDAO()
