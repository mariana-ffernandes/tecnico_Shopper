export function isValidBase64(input: string): boolean {
    const regex: RegExp =
      /^(data:image\/(png|jpeg|jpg);base64,)?[A-Za-z0-9+/=]+$/;
  
    return regex.test(input);
  }