import UserDTO from "../models/userDTO"
import userDAO from "../daos/userDAO"
import bcrypt from "bcrypt"
import { randomUUID } from "crypto"

class UserService {
  async createUser(userDTO: UserDTO): Promise<string> {
    const id = randomUUID()
    const { email, nickname, password } = userDTO
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    return await userDAO.createUser(email, nickname || "User", hash, id)
  }
}

export default new UserService()
