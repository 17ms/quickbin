import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreatePost from "./components/CreatePost"
import ViewPost from "./components/ViewPost"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePost />} />
        <Route path="/posts/:id" element={<ViewPost />} />
      </Routes>
    </BrowserRouter>
  )
}
