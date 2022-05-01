import postDTO from "../models/postDTO"
import postDAO from "../daos/postDAO"
import ApiError from "../errors/apiError"

class PostService {
  async createPost(postDTO: postDTO): Promise<string> {
    const { title, content } = postDTO
    return await postDAO.createPost(title, content)
  }

  async getPost(id: string): Promise<postDTO> {
    const data = await postDAO.getPost(id)

    if (data.length === 0) {
      throw ApiError.notFound("The ID doesn't match any post.")
    } else if (data.length > 1) {
      throw ApiError.internal("Duplicate ID detected, request aborted.")
    }

    return data[0] as postDTO
  }
}

export default new PostService()
