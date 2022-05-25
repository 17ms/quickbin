import express from "express"
import passport from "passport"
import {
  handleSignup,
  handleLogin,
  handleLogout,
  handleSignupRender,
  handleLoginRender,
  handleUserdataRender,
  handlePasswordUpdateRender,
  handlePasswordUpdate
} from "../controllers/authController"

const router = express.Router()

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

router.route("/logout").post(handleLogout)

router.route("/user").get(handleUserdataRender)

router
  .route("/update")
  .get(handlePasswordUpdateRender)
  .post(
    handlePasswordUpdate,
    passport.authenticate("update", {
      successRedirect: "/",
      failureRedirect: "/auth/update",
      failureFlash: true
    })
  )

export default router
