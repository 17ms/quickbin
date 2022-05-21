import express from "express"
import { handlePostRender } from "../controllers/postsController"

const router = express.Router()

router.route("/:id").get(handlePostRender)

export default router
