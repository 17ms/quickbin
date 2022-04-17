import postDTO from "../models/postDTO"
import postDAO from "../daos/postDAO"

class PostService {
  async createPost(postDTO: postDTO): Promise<string> {
    const { title, content } = postDTO
    return await postDAO.createPost(title, content)
  }
}

export default new PostService()
