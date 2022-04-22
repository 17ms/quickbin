import postDTO from "../models/postDTO"
import postDAO from "../daos/postDAO"
import ApiError from "../errors/apiError"

class PostService {
  async createPost(postDTO: postDTO): Promise<string> {
    const { title, content } = postDTO
    return await postDAO.createPost(title, content)
  }

  async getPost(id: string): Promise<[string, string]> {
    const post = await postDAO.getPost(id)
    //console.log(typeof post[0] === "undefined")
    if (typeof post[0] === "undefined") {
      throw ApiError.notFound("The ID doesn't match any post.")
    }
    return post
  }
}

export default new PostService()
