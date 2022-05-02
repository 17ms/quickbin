import React, { useEffect, useRef } from "react"
import { TextField, Button } from "@material-ui/core"
import { getData } from "../utils/axios"
import { useParams } from "react-router-dom"

export default function ViewPost() {
  const { id } = useParams()
  const [post, setPost] = React.useState({
    title: "",
    content: ""
  })

  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      getData(id as string)
        .then((res) => {
          const data = res.data
          console.log(res.data)
          setPost(data)
        })
        .catch((err) => console.log(err))

      initialRender.current = false
    }
  }, [id])

  return (
    <div className="view-post">
      <TextField
        label="Title"
        variant="filled"
        style={{ width: "60%" }}
        value={post.title}
        inputProps={{ readOnly: true }}
      />
      <TextField
        label="Content"
        id="multiline-text-input"
        variant="filled"
        style={{ width: "80%" }}
        value={post.content}
        inputProps={{ readOnly: true }}
      />
      <br />
      <Button variant="outlined">Home</Button>
    </div>
  )
}
