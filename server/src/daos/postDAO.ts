import db from "../configs/db"
import idGenerator from "../utils/idGenerator"

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

  async getPost(id: string): Promise<[string, string]> {
    const [title, content] = await db("post")
      .where({ id })
      .select("title", "content")

    return [title, content]
  }
}

export default new PostDAO()
