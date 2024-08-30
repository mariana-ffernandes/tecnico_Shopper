import { Measure } from "@/domain/entitie/measure";

export class MeasureValidator {
  static isValid(measure: Measure): string {
    if (measure.customer_code.length == 0) {
      return "Invalid customer code.";
    }

    if (!measure.measure_datetime && !new Date(measure.measure_datetime)) {
      return "Invalid date format.";
    }

    if (measure.measure_type != "WATER" && measure.measure_type != "GAS") {
      return "Invalid measure type.";
    }
  }
}