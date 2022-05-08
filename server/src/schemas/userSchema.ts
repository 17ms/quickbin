import { AllowedSchema } from "express-json-validator-middleware"

const userSchema: AllowedSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      minLength: 1,
      maxLength: 255
    },
    nickname: {
      type: "string",
      maxLength: 255
    },
    password: {
      type: "string",
      minLength: 8
    }
  }
}

export default userSchema
