import { Request, Response } from "express"
import postService from "../services/postService"

class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const id = await postService.createPost(req.body)
      res.status(201).json(id)
    } catch (err) {
      console.error(err)
      res.status(500).json("Something went wrong with the POST-request")
    }
  }

  async getPost(req: Request, res: Response) {
    try {
      const [title, content] = await postService.getPost(req.params.id)
      res.status(200).json({
        title,
        content
      })
    } catch (err) {
      console.error(err)
      res.status(500).json("Something went wrong with the GET-request")
    }
  }
}

export default new PostController()
