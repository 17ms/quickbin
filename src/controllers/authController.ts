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

export const handleLogout = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    req.flash("message", "You must be logged in to log out")
    res.redirect("/auth/login")
  } else {
    console.log(`User [${req.user.username}] logged out successfully`)
    req.logout()
    req.flash("message", "Successfully logged out")
    res.redirect("/")
  }
}

export const handlePasswordUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    req.flash("message", "You must be logged in to update your password")
    res.redirect("/auth/login")
  } else if (
    !req.body.oldPassword ||
    !req.body.newPassword ||
    !req.body.newConfirmation
  ) {
    req.flash("message", "Please provide your old and new passwords")
    res.redirect("/auth/update")
  } else if (req.body.newPassword !== req.body.newConfirmation) {
    req.flash("message", "Please provide matching new passwords")
    res.redirect("/auth/update")
  } else if (req.body.oldPassword === req.body.newPassword) {
    req.flash("message", "New password can't be the same as the new one")
    res.redirect("/auth/update")
  } else {
    next()
  }
}

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
    req.flash("message", "You must be logged in to access userdata")
    res.redirect("/auth/login")
  } else {
    res.render("pages/user", {
      user: req.user,
      message: res.locals.message
    })
  }
}

export const handlePasswordUpdateRender = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    req.flash("message", "You must be logged in to update your password")
    res.redirect("/auth/login")
  } else {
    res.render("pages/update", {
      user: req.user,
      message: res.locals.message
    })
  }
}
