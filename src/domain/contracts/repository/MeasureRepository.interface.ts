import { Measure } from "@/domain/entitie/measure"; 

export interface MeasureRepository {
  insert(measure: Measure): Promise<void>;
  update(measure: Measure): Promise<void>;
  getById(measure_uuid: string): Promise<Measure>;
  getByCustomerCodeAndType(
    customer_code: string,
    measure_type: string
  ): Promise<Measure[]>;
  getByDateTypeCustomer(
    measure_datetime: Date,
    measure_type: string,
    customer_code: string
  ): Promise<Measure>;
  getByCustomerCode(customer_code: string): Promise<Measure[]>;
}