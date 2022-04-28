import axios from "axios"

// TODO: set with environment variables
const api = axios.create({
  baseURL: "http://localhost:4000"
})

export default api
