import axios from "axios"
import postDTO from "../../../server/src/models/postDTO"

// TODO: set with environment variables
const api = axios.create({
  baseURL: "http://localhost:4000"
})

export const getData = (id: string) => {
  return api.get(`/posts/${id}`)
}

export const postData = (data: postDTO) => {
  return api.post("/", data)
}
