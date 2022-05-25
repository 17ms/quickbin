import { Request, Response } from "express"
import db from "../configs/database"
import logger from "../utils/winston"

export const handlePostRender = async (req: Request, res: Response) => {
  const post = await db("posts")
    .where({ id: req.params.id })
    .first()
    .select("id", "title", "content", "owner", "created_at")
    .catch((err) => {
      logger.log("error", err)
      throw err
    })

  if (!post) {
    req.flash("message", "Provided ID doesn't match any post")
    res.redirect("/")
  } else {
    res.render("pages/post", {
      user: req.user,
      id: post.id,
      owner: post.owner || "Anonymous",
      title: post.title,
      content: post.content,
      date: post.created_at
    })
  }
}
