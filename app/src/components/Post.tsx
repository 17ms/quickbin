import React from "react"
import { TextField } from "@material-ui/core"
import { Button } from "@material-ui/core"
import api from "../utils/axios"

export default function Post() {
  const [state, setState] = React.useState({
    title: null,
    content: null
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const value = event.target.value
    setState({
      ...state,
      [event.target.name]: value
    })
  }

  const handleCreatePost = () => {
    if (state.content) {
      api
        .post("/", state)
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
      />
      <TextField
        id="multiline-text-input"
        label="Content"
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
