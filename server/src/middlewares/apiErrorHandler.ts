import { ValidationError } from "express-json-validator-middleware"
import { Request, Response, NextFunction } from "express"
import ApiError from "../errors/apiError"

export function apiValidationErrorHandler(
  err: ValidationError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent || !(err instanceof ValidationError)) {
    next(err)
  } else {
    res.status(400).send(err.validationErrors)
    // LOG WITH WINSTON
    next()
  }
}

export function apiGetErrorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent || !(err instanceof ApiError)) {
    next(err)
  } else {
    res.status(err.code).send(err.msg)
    // LOG WITH WINSTON
    next()
  }
}
