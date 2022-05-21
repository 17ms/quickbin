import express from "express"
import passport from "passport"
import {
  handleSignup,
  handleLogin,
  //handleLogout,
  //getUserInfo,
  handleSignupRender,
  handleLoginRender,
  handleUserdataRender
} from "../controllers/authController"

const router = express.Router()

// TODO: validation for POST

router
  .route("/signup")
  .get(handleSignupRender)
  .post(
    handleSignup,
    passport.authenticate("signup", {
      successRedirect: "/",
      failureRedirect: "/auth/signup",
      failureFlash: true
    })
  )

router
  .route("/login")
  .get(handleLoginRender)
  .post(
    handleLogin,
    passport.authenticate("login", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true
    })
  )

router.route("/logout").get()

router.route("/user").get(handleUserdataRender)

export default router
