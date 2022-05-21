import express from "express"
import {
  handleIndexRender,
  handleCreatePost
} from "../controllers/indexController"

const router = express.Router()

// TODO: validation for POST

router.route("/").get(handleIndexRender)

router.route("/create").post(handleCreatePost)

export default router
