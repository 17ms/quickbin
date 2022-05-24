export {}

declare global {
  namespace Express {
    interface User {
      uid: string
      username: string
      hash: string
      created: string
      edited: string
    }
  }
}
