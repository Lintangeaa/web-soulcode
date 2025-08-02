interface ApiResponse<T> {
  message: string
  result: T
  status: number
}