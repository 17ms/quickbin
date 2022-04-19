import express from "express"
import postController from "../controllers/postController"

const router = express.Router()

router.use(express.json())

router.get("/:id", postController.getPost)

export default router
