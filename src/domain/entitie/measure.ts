import crypto from "crypto";

export class Measure {
  constructor(
    readonly measure_uuid: string,
    readonly customer_code: string,
    readonly measure_datetime: Date,
    readonly measure_type: string,
    private has_confirmed: boolean,
    private image_url: string,
    private measure_value: number
  ) {}

  static create(
    customer_code: string,
    measureDatetime: Date,
    measureType: string
  ) {
    const uuid = crypto.randomUUID();
    const has_confirmed = false;
    const image_url = "";
    const measure_value = 0;

    return new Measure(
      uuid,
      customer_code,
      measureDatetime,
      measureType,
      has_confirmed,
      image_url,
      measure_value
    );
  }

  getImageUrl(): string {
    return this.image_url;
  }

  setImageUrl(value: string) {
    this.image_url = value;
  }

  setMeasureValue(value: number) {
    this.measure_value = value;
  }

  getMeasureValue(): number {
    return this.measure_value;
  }

  getMeasureConfirm(): boolean {
    return this.has_confirmed;
  }

  confirm() {
    this.has_confirmed = true;
  }
}