import { MeasureRepository } from "@/domain/contracts/repository/MeasureRepository.interface";
import { Measure } from "@/domain/entitie/measure";

export class MeasureMemoryRepository implements MeasureRepository {
  measures: Measure[] = [];

  constructor() {}
  getByCustomerCode(customer_code: string): Promise<Measure[]> {
    throw new Error("Method not implemented.");
  }

  async getByCustomerCodeAndType(
    customer_code: string,
    measure_type: string
  ): Promise<Measure[]> {
    return this.measures.filter(
      (measure) =>
        measure.customer_code == customer_code &&
        (measure_type !== ""
          ? measure.measure_type.toLowerCase() == measure_type.toLowerCase()
          : true)
    );
  }

  async getById(measure_uuid: string): Promise<Measure> {
    return this.measures.find(
      (measure) => measure.measure_uuid == measure_uuid
    );
  }

  async update(measure: Measure): Promise<void> {
    const index = this.measures.findIndex(
      (measureData) => measureData.measure_uuid === measure.measure_uuid
    );

    this.measures[index] = measure;
  }

  async insert(measure: Measure): Promise<void> {
    this.measures.push(measure);
  }

  async getByDateTypeCustomer(
    measure_datetime: Date,
    measure_type: string,
    customer_code: string
  ): Promise<Measure> {
    return this.measures.find(
      (measure) =>
        new Date(measure.measure_datetime).getMonth() ==
          new Date(measure_datetime).getMonth() &&
        new Date(measure.measure_datetime).getFullYear() ==
          new Date(measure_datetime).getFullYear() &&
        measure.measure_type === measure_type &&
        measure.customer_code === customer_code
    );
  }
}