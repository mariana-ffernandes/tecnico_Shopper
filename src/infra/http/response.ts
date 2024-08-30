export class HttpResponse<T> {
    static ok(content: any) {
      return {
        statusCode: 200,
        response: content,
      };
    }
  
    static badRequest(message: string) {
      return {
        statusCode: 400,
        response: {
          error_code: "INVALID_DATA",
          error_description: message,
        },
      };
    }
  
    static conflictError(message: string) {
      return {
        statusCode: 409,
        response: {
          error_code: "DOUBLE_REPORT",
          error_description: message,
        },
      };
    }
  
    static invalidError(message: string) {
      return {
        statusCode: 400,
        response: {
          error_code: "INVALID_TYPE",
          error_description: message,
        },
      };
    }
  
    static duplicateError(message: string) {
      return {
        statusCode: 409,
        response: {
          error_code: "CONFIRMATION_DUPLICATE",
          error_description: message,
        },
      };
    }
  
    static notFound(message: string) {
      return {
        statusCode: 404,
        response: {
          error_code: "MEASURE_NOT_FOUND",
          error_description: message,
        },
      };
    }
  }