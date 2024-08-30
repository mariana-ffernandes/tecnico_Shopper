import { Request, Response, Router } from "express";
import { UploadRequestDto } from "../../application/dtos/upload-request.dto";
import { Upload } from "../../application/usecase/upload.usecase";
import fs from "fs";
import path from "path";
import { ConfirmRequestDto } from "@/application/dtos/confirm-request.dto";
import { Confirm } from "@/application/usecase/confirm.usecase";
import { List } from "@/application/usecase/list.usecase";
import { ListRequestDto } from "@/application/dtos/list-request.dto";

export class ManagerController {
  constructor(router: Router, upload: Upload, confirm: Confirm, list: List) {
    router.post("/upload", async (req: Request, res: Response) => {
      const response: any = await upload.execute(req.body);

      res.status(response.statusCode).json(response.response);
    });

    router.patch("/confirm", async (req: Request, res: Response) => {
      const response: any = await confirm.execute(req.body);

      res.status(response.statusCode).json(response.response);
    });

    router.get("/:customer_code/list", async (req: Request, res: Response) => {
      const { measure_type } = req.query;

      const input: ListRequestDto = {
        customer_code: req.params.customer_code,
        measure_type: measure_type ? measure_type.toString() : "",
      };

      const response: any = await list.execute(input);

      res.status(response.statusCode).json(response.response);
    });

    router.get("/uploads/:image_file", async (req: Request, res: Response) => {
      const uploadsPath = path.join(__dirname, "../../../uploads");
      fs.readFile(
        `${uploadsPath}/${req.params.image_file}`,

        function (err, image) {
          if (err) {
            throw err;
          }

          res.setHeader("Content-Type", "image/jpg");
          res.setHeader("Content-Length", "");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(image);
        }
      );
    });
  }
}