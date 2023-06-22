export interface ApiResponse<T> {
  ok: boolean
  data?: T | T[]
  message?: string
}
