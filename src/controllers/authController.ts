import { Request, Response, NextFunction } from "express"

export const handleSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    req.flash("message", "You're already logged in")
    res.redirect("/")
  } else {
    if (!req.body.email || !req.body.password) {
      req.flash("message", "Please provide username and password")
      res.redirect("/auth/login")
    } else if (req.body.password !== req.body.confirmation) {
      req.flash("message", "Please provide matching passwords")
      res.redirect("/auth/login")
    } else {
      next()
    }
  }
}

export const handleLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    req.flash("message", "You're already logged in")
    res.redirect("/")
  } else {
    if (!req.body.email || !req.body.password) {
      req.flash("message", "Please provide username and password")
      res.redirect("/auth/login")
    } else {
      next()
    }
  }
}

// TODO: implement "logout" & "update password" functionalities

export const handleSignupRender = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (req.isAuthenticated()) {
    req.flash("message", "You're already logged in")
    res.redirect("/")
  } else {
    res.render("pages/signup", {
      user: req.user,
      message: res.locals.message
    })
  }
}

export const handleLoginRender = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (req.isAuthenticated()) {
    req.flash("message", "You're already logged in")
    res.redirect("/")
  } else {
    res.render("pages/login", {
      user: req.user,
      message: res.locals.message
    })
  }
}

export const handleUserdataRender = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    req.flash("message", "You must be signed in to access userdata")
    res.redirect("/auth/login")
  } else {
    res.render("pages/user", {
      user: req.user,
      message: res.locals.message
    })
  }
}
