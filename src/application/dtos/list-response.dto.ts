import { MeasureDto } from "./measure.dto";

export type ListResponseDto = {
  customer_code: string;
  measures: MeasureDto[];
};