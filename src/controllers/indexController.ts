import { NextFunction, Request, Response } from "express"
import idGenerator from "../utils/idGenerator"
import db from "../configs/database"
import logger from "../utils/winston"

export const handleCreatePost = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const id = idGenerator()

  // Not very elegant, but definitely readable
  if (req.isAuthenticated()) {
    await db("posts")
      .insert({
        id,
        title: req.body.title,
        content: req.body.content,
        owner: req.user.username
      })
      .catch((err) => {
        logger.log("error", err)
        throw err
      })
  } else {
    await db("posts")
      .insert({
        id,
        title: req.body.title,
        content: req.body.content
      })
      .catch((err) => {
        logger.log("error", err)
        throw err
      })
  }

  logger.log("info", `Post [${id}] created successfully`)
  req.flash("message", `Post created successfully: ${id}`)
  res.redirect("/") // Avoid resend-form problems when reloading page
}

export const handleIndexRender = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.render("pages/index", {
    user: req.user,
    message: res.locals.message
  })
}
