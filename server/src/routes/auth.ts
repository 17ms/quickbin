import express from "express"
import { Validator } from "express-json-validator-middleware"
import passport from "passport"
import userSchema from "../schemas/userSchema"
import userController from "../controllers/userController"
import { apiValidationErrorHandler } from "../middlewares/apiErrorHandler"

const router = express.Router()

const { validate } = new Validator({})

router.get("/login", userController.isLoggedOut)
router.get("/logout", userController.isLoggedIn, userController.handleLogOut)
router.get("/user", userController.isLoggedIn, userController.getUserData)

router.post(
  "/login",
  validate({ body: userSchema }),
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/",
    failureMessage: true
  })
)

router.post(
  "/signup",
  validate({ body: userSchema }),
  userController.createUser
)

router.use(apiValidationErrorHandler)

export default router
