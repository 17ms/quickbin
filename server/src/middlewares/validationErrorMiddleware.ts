import { ValidationError } from "express-json-validator-middleware"
import { Request, Response, NextFunction } from "express"

export default function validationErrorMiddleware(
  error: ValidationError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent || !(error instanceof ValidationError)) {
    next(error)
  }

  res.status(400).json(error.validationErrors)
  next()
}
