export default class ApiError {
  code: number
  msg: string

  constructor(code: number, msg: string) {
    this.code = code
    this.msg = msg
  }

  static notFound(msg: string) {
    return new ApiError(404, msg)
  }

  static internal(msg: string) {
    return new ApiError(500, msg)
  }
}
