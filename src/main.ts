import express, { Router } from "express";
import dotenv from "dotenv";
import { ManagerController } from "./infra/controller/manager.controller";
import { Upload } from "./application/usecase/upload.usecase";
import { Gemini } from "./infra/provider/gemini.provider";
import { FileManagementData } from "./infra/file-management/file-management";
import { MeasureMemoryRepository } from "./infra/repository/measure-memory.respository";
import { Confirm } from "./application/usecase/confirm.usecase";
import { List } from "./application/usecase/list.usecase";
import { MeasureRepositoryDatabase } from "./infra/repository/measure.repository";

const app = express();

app.use(express.json({ limit: "50mb" }));

const envFound = dotenv.config({
  path: process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : "arquivo.env",
});

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
const router: Router = Router();

const gemini = new Gemini();

const fileManagement = new FileManagementData();

//const measureRepositoryMemory = new MeasureMemoryRepository();

const measureRepository = new MeasureRepositoryDatabase();

const upload = new Upload(measureRepository, gemini, fileManagement);

const confirm = new Confirm(measureRepository);

const list = new List(measureRepository);

new ManagerController(router, upload, confirm, list);

app.use(router);

app.listen(3000, () => console.log(`Server listening on port: 3000`));