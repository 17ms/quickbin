import postDTO from "../models/postDTO"
import postDAO from "../daos/postDAO"
import ApiError from "../errors/apiError"
import idGenerator from "../utils/idGenerator"

class PostService {
  async createPost(postDTO: postDTO): Promise<string> {
    const id = idGenerator()
    const { title, content } = postDTO
    return await postDAO.createPost(title, content, id)
  }

  async getPost(id: string): Promise<postDTO> {
    const data = await postDAO.getPost(id)

    if (!data) {
      throw ApiError.notFound("The ID doesn't match any post.")
    }

    return data as postDTO
  }
}

export default new PostService()
