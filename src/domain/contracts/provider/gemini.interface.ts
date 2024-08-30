export interface GeminiProvider {
    getContentByDescription(
      mimeType: string,
      fileData: string,
      description: string
    ): Promise<string>;
  }