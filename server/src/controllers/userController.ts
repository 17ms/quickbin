import { NextFunction, Request, Response } from "express"
import passport from "passport"
import userService from "../services/userService"

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = await userService.createUser(req.body).then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        passport.authenticate("local", (_err, user, _info) => {
          if (user) {
            res.status(201).json(userID)
          }
        })
      })
    } catch (err) {
      next(err)
    }
  }

  handleLogOut(req: Request, res: Response, next: NextFunction) {
    try {
      req.logout()
      res.redirect("/")
    } catch (err) {
      next(err)
    }
  }

  handleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(req.user)
    } catch (err) {
      next(err)
    }
  }

  isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect("/login")
    }
  }

  isLoggedOut(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      return next()
    } else {
      res.redirect("/")
    }
  }

  getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(req.user)
    } catch (err) {
      next(err)
    }
  }
}

export default new UserController()
