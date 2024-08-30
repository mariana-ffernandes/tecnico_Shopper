import fs from "fs";
import crypto from "crypto";
import path from "path";
import { FileManagement } from "../../domain/contracts/file-management/file-management.interface";

export class FileManagementData implements FileManagement {
  constructor() {}

  createTempFile(fileData: string, fileFormat: string): string {
    const fileName: string = crypto.randomUUID();

    const buffer = Buffer.from(fileData, "base64");

    const uploadsPath = path.join(__dirname, "../../../uploads");

    const tempFilePath = path.join(uploadsPath, `${fileName}.${fileFormat}`);

    fs.writeFileSync(tempFilePath, buffer);

    return `${fileName}.${fileFormat}`;
  }
}