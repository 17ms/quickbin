import db from "../configs/db"

class UserDAO {
  async createUser(
    email: string,
    nickname: string,
    hash: string,
    id: string
  ): Promise<string> {
    const [userID] = await db("users")
      .insert({
        id,
        email,
        nickname,
        hash
      })
      .returning("id")

    return userID
  }
}

export default new UserDAO()
