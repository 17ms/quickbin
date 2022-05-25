import express from "express"
import {
  handleIndexRender,
  handleCreatePost
} from "../controllers/indexController"

const router = express.Router()

router.route("/").get(handleIndexRender)

router.route("/create").post(handleCreatePost)

export default router
