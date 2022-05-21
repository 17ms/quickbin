import { NextFunction, Request, Response } from "express"

const assignLocals = (req: Request, res: Response, next: NextFunction) => {
  res.locals.message = req.flash("message")
  next()
}

export default assignLocals
