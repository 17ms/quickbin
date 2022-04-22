import { NextFunction, Request, Response } from "express"
import postService from "../services/postService"
import ApiError from "../errors/apiError"

class PostController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await postService.createPost(req.body)
      res.status(201).json(id)
    } catch (err) {
      // LOG WITH WINSTON
      next(ApiError.internal(`The server cannot process the request (${err}).`))
    }
  }

  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const [title, content] = await postService.getPost(req.params.id)
      res.status(200).json({
        title,
        content
      })
    } catch (err) {
      // LOG WITH WINSTON
      next(err)
    }
  }
}

export default new PostController()
