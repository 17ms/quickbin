import React from "react"
import { TextField, Button } from "@material-ui/core"
import { postData } from "../utils/axios"

export default function CreatePost() {
  const [post, setPost] = React.useState({
    title: "",
    content: ""
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPost({
      ...post,
      [event.target.name]: event.target.value
    })
  }

  const handleCreatePost = async () => {
    if (post.content) {
      postData(post)
        .then((res) => {
          console.log(res)
          console.log(res.data)
        })
        .catch((err) => console.log(err))
    } else {
      console.log("Can't create a post without any content")
    }
  }

  return (
    <div className="create-post">
      <TextField
        label="Title"
        variant="filled"
        style={{ width: "60%" }}
        name="title"
        onChange={handleChange}
        inputProps={{ maxLength: 120 }}
      />
      <TextField
        label="Content"
        id="multiline-text-input"
        variant="filled"
        style={{ width: "80%" }}
        name="content"
        onChange={handleChange}
      />
      <br />
      <Button variant="outlined" onClick={handleCreatePost}>
        Create
      </Button>
    </div>
  )
}
