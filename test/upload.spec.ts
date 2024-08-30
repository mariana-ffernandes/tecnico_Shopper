import { UploadDto } from "../src/application/dtos/upload.dto";
import { Measure } from "../src/domain/entitie/measure";

describe("Testes do método de upload.", () => {
  test("Deve realizar o envio de um arquivo com o base64 inválido.", () => {
    const input: UploadDto = {
      image: "",
      customer_code: "a123",
      measure_datetime: new Date(),
      measure_type: "WATER",
    };

    expect(() => {
      Measure.create(
        input.customer_code,
        input.measure_datetime,
        input.measure_type,
        input.image
      );
    }).toThrow("Invalid image.");
  });

  test("Deve realizar o envio de um arquivo com o customer code inválido.", () => {
    const input: UploadDto = {
      image: "aGVsbG8gd29ybGQ='",
      customer_code: "",
      measure_datetime: new Date(),
      measure_type: "WATER",
    };

    expect(() => {
      Measure.create(
        input.customer_code,
        input.measure_datetime,
        input.measure_type,
        input.image
      );
    }).toThrow("Invalid customer code.");
  });
});