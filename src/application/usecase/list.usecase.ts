import { HttpResponse } from "@/infra/http/response";
import { MeasureRepository } from "@/domain/contracts/repository/MeasureRepository.interface";
import { ListResponseDto } from "../dtos/list-response.dto";
import { MeasureDto } from "../dtos/measure.dto";
import { Measure } from "@/domain/entitie/measure";
import { ListRequestDto } from "../dtos/list-request.dto";

export class List {
  constructor(readonly measureRepository: MeasureRepository) {}

  async execute(input: ListRequestDto): Promise<HttpResponse<ListResponseDto>> {
    if (
      input.measure_type != "" &&
      input.measure_type != "WATER" &&
      input.measure_type != "GAS"
    ) {
      return HttpResponse.invalidError("Tipo de medição não permitida");
    }

    let measures: Measure[];

    if (input.measure_type) {
      measures = await this.measureRepository.getByCustomerCodeAndType(
        input.customer_code,
        input.measure_type
      );
    } else {
      measures = await this.measureRepository.getByCustomerCode(
        input.customer_code
      );
    }

    if (measures.length == 0) {
      return HttpResponse.notFound("Nenhuma leitura encontrada");
    }

    const measuresDto: MeasureDto[] = [];

    measures.forEach((measure) => {
      measuresDto.push({
        measure_uuid: measure.measure_uuid,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        has_confirmed: measure.getMeasureConfirm(),
        image_url: measure.getImageUrl(),
      });
    });

    const response: ListResponseDto = {
      customer_code: input.customer_code,
      measures: measuresDto,
    };

    return HttpResponse.ok({
      response,
    });
  }
}