export class CustomError {
    constructor(private error_code: string, private error_description: string) {}
  
    static Validate(error_description: string) {
      return new CustomError("INVALID_DATA", error_description);
    }
  
    static Conflict(error_description: string) {
      return new CustomError("DOUBLE_REPORT", error_description);
    }
  }