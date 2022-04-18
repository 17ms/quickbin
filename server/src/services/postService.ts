import postDTO from "../models/postDTO"
import postDAO from "../daos/postDAO"

class PostService {
  async createPost(postDTO: postDTO): Promise<string> {
    const { title, content } = postDTO
    return await postDAO.createPost(title, content)
  }

  async getPost(id: string): Promise<[string, string]> {
    return await postDAO.getPost(id)
  }
}

export default new PostService()
