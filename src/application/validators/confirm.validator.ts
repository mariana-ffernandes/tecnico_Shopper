import { ConfirmRequestDto } from "../dtos/confirm-request.dto";
import { isValidUUID } from "./uuid.validator";

export class ConfirmValidator {
  static isValid(confirmRequestDto: ConfirmRequestDto): string {
    if (!isValidUUID(confirmRequestDto.measure_uuid)) {
      return "O id da conta é invalido.";
    }

    if (
      !(
        Number.isInteger(confirmRequestDto.confirmed_value) ||
        (typeof confirmRequestDto.confirmed_value === "string" &&
          /^-?\d+$/.test(confirmRequestDto.confirmed_value))
      )
    ) {
      return "Valor da medição é inválido.";
    }
  }
}