import db from "../configs/db"
import postDTO from "../models/postDTO"

class PostDAO {
  async createPost(
    title: string,
    content: string,
    id: string
  ): Promise<string> {
    const [postID] = await db("posts")
      .insert({
        id,
        title,
        content
      })
      .returning("id")

    return postID
  }

  async getPost(id: string): Promise<postDTO> {
    return await db("posts").where({ id }).first().select("title", "content")
  }
}

export default new PostDAO()
