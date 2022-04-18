import { AllowedSchema } from "express-json-validator-middleware"

const postSchema: AllowedSchema = {
  type: "object",
  required: ["content"],
  properties: {
    title: {
      type: "string",
      maxLength: 120
    },
    content: {
      type: "string",
      minLength: 1
    }
  }
}

export default postSchema
