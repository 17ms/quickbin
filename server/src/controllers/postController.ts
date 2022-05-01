import { NextFunction, Request, Response } from "express"
import postService from "../services/postService"

class PostController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await postService.createPost(req.body)
      res.status(201).json(id)
    } catch (err) {
      next(err)
    }
  }

  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postService.getPost(req.params.id)
      res.status(200).json(post)
    } catch (err) {
      next(err)
    }
  }
}

export default new PostController()
