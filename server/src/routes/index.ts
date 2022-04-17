import express from "express"
import postController from "../controllers/postController"

// GET "/" & POST paste

const router = express.Router()

router.use(express.json())

router.post("/", postController.createPost)

export default router
