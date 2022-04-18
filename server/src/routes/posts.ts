import express from "express"
import postController from "../controllers/postController"

// GET paste by id

export const router = express.Router()

router.use(express.json())

router.get("/:id", postController.getPost)
