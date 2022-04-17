import { Request, Response } from "express"
import postService from "../services/postService"

class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const id = await postService.createPost(req.body)
      res.status(201).json(id)
    } catch (err) {
      console.error(err)
    }
  }
}

export default new PostController()
