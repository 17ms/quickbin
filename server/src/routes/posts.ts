import express from "express"
import postController from "../controllers/postController"
import { apiGetErrorHandler } from "../middlewares/apiErrorHandler"

const router = express.Router()

router.get("/:id", postController.getPost)

router.use(apiGetErrorHandler)

export default router
