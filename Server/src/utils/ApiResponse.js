class ApiResponse {
  constructor(
    statusCode = 200,
    message = "Success",
    data = null,
    requestId =  null,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    this.data = data;
    this.requestId = requestId;
    this.timestamp = new Date().toISOString();
  }
}

export { ApiResponse };
