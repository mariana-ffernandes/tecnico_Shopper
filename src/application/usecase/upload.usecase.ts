import { HttpResponse } from "@/infra/http/response";
import { FileManagement } from "../../domain/contracts/file-management/file-management.interface";
import { GeminiProvider } from "../../domain/contracts/provider/gemini.interface";
import { Measure } from "../../domain/entitie/measure";
import { UploadResponseDto } from "../dtos/upload-response.dto";
import { UploadRequestDto } from "../dtos/upload-request.dto";
import { isValidBase64 } from "../validators/base64.validator";
import { MeasureValidator } from "../validators/measure.validator";
import { MeasureRepository } from "@/domain/contracts/repository/MeasureRepository.interface";

export class Upload {
  constructor(
    readonly measureRepository: MeasureRepository,
    readonly geminiProvider: GeminiProvider,
    readonly fileManagement: FileManagement
  ) {}

  async execute(
    input: UploadRequestDto
  ): Promise<HttpResponse<UploadResponseDto>> {
    const measure = Measure.create(
      input.customer_code,
      input.measure_datetime,
      input.measure_type
    );

    if (!isValidBase64(input.image)) {
      return HttpResponse.badRequest("Invalid image base64.");
    }

    const isInvalid = MeasureValidator.isValid(measure);

    if (isInvalid) {
      return HttpResponse.badRequest(isInvalid);
    }

    const existMeasure = await this.measureRepository.getByDateTypeCustomer(
      measure.measure_datetime,
      measure.measure_type,
      measure.customer_code
    );

    if (existMeasure) {
      return HttpResponse.conflictError("Leitura do mês já realizada");
    }

    const regex = /^data:(image\/[a-zA-Z0-9+.-]+);base64/;

    const fileData: string = input.image.split(",")[1];
    const mimeType: string = input.image.split(",")[0].match(regex)![1];
    const fileFormat: string = input.image.match(
      /^data:image\/([^;]+);base64/
    )![1];

    const fileName: string = this.fileManagement.createTempFile(
      fileData,
      fileFormat
    );

    const description: string = `Qual o valor presente no mostrador do medidor de ${
      measure.measure_type == "GAS" ? "gas" : "água"
    }? A mensagem de retorno deve ser apenas o número extraido.`;

    const result = await this.geminiProvider.getContentByDescription(
      mimeType,
      fileData,
      description
    );

    measure.setMeasureValue(parseInt(result));
    measure.setImageUrl(`http://localhost:3000/uploads/${fileName}`);

    await this.measureRepository.insert(measure);

    return HttpResponse.ok({
      image_url: measure.getImageUrl(),
      measure_value: measure.getMeasureValue(),
      measure_uuid: measure.measure_uuid,
    });
  }
}