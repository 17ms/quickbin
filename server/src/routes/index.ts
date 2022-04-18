import express from "express"
import { Validator } from "express-json-validator-middleware"
import postController from "../controllers/postController"
import postSchema from "../schemas/postSchema"
import validationErrorMiddleware from "../middlewares/validationErrorMiddleware"

export const router = express.Router()

const { validate } = new Validator({})

// TODO => create GET for "/"

router.post("/", validate({ body: postSchema }), postController.createPost)

router.use(validationErrorMiddleware)
