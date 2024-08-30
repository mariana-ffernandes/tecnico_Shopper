import { MeasureRepository } from "@/domain/contracts/repository/MeasureRepository.interface";
import { Measure } from "@/domain/entitie/measure";
import pgp from "pg-promise";

export class MeasureRepositoryDatabase implements MeasureRepository {
  connection: any;

  constructor() {
    this.connection = pgp()(process.env.DATABASE_URL);
  }

  async insert(measure: Measure): Promise<void> {
    this.connection.query(
      "insert into shopper.measures (measure_uuid, customer_code, measure_datetime, measure_type, has_confirmed, image_url, measure_value) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        measure.measure_uuid,
        measure.customer_code,
        measure.measure_datetime,
        measure.measure_type,
        measure.getMeasureConfirm(),
        measure.getImageUrl(),
        measure.getMeasureValue(),
      ]
    );
  }

  async update(measure: Measure): Promise<void> {
    await this.connection.query(
      "update shopper.measures set customer_code = $2, measure_datetime = $3, measure_type = $4, has_confirmed = $5, image_url = $6, measure_value = $7 where measure_uuid = $1",
      [
        measure.measure_uuid,
        measure.customer_code,
        measure.measure_datetime,
        measure.measure_type,
        measure.getMeasureConfirm(),
        measure.getImageUrl(),
        measure.getMeasureValue(),
      ]
    );
  }

  async getById(measure_uuid: string): Promise<Measure> {
    const [measureData] = await this.connection.query(
      "select * from shopper.measures where measure_uuid = $1",
      [measure_uuid]
    );

    if (!measureData) {
      return null;
    }

    return new Measure(
      measureData.measure_uuid,
      measureData.customer_code,
      new Date(measureData.measure_datetime),
      measureData.measure_type,
      measureData.has_confirmed,
      measureData.image_url,
      measureData.measure_value
    );
  }

  async getByCustomerCodeAndType(
    customer_code: string,
    measure_type: string
  ): Promise<Measure[]> {
    const measureDatas = await this.connection.query(
      "select * from shopper.measures where customer_code = $1 and measure_type = $2",
      [customer_code, measure_type]
    );

    if (measureDatas) {
      const measures = [];
      for (const measureData of measureDatas) {
        measures.push(
          new Measure(
            measureData.measure_uuid,
            measureData.customer_code,
            new Date(measureData.measure_datetime),
            measureData.measure_type,
            measureData.has_confirmed,
            measureData.image_url,
            measureData.measure_value
          )
        );
      }
      return measures;
    }

    return [];
  }

  async getByCustomerCode(customer_code: string): Promise<Measure[]> {
    const measureDatas = await this.connection.query(
      "select * from shopper.measures where customer_code = $1",
      [customer_code]
    );

    if (measureDatas) {
      const measures = [];
      for (const measureData of measureDatas) {
        measures.push(
          new Measure(
            measureData.measure_uuid,
            measureData.customer_code,
            new Date(measureData.measure_datetime),
            measureData.measure_type,
            measureData.has_confirmed,
            measureData.image_url,
            measureData.measure_value
          )
        );
      }
      return measures;
    }

    return [];
  }

  async getByDateTypeCustomer(
    measure_datetime: Date,
    measure_type: string,
    customer_code: string
  ): Promise<Measure> {
    const [measureData] = await this.connection.query(
      "select * from shopper.measures where measure_datetime = $1 and measure_type = $2 and customer_code = $3",
      [measure_datetime, measure_type, customer_code]
    );

    if (!measureData) {
      return null;
    }

    return new Measure(
      measureData.measure_uuid,
      measureData.customer_code,
      new Date(measureData.measure_datetime),
      measureData.measure_type,
      measureData.has_confirmed,
      measureData.image_url,
      measureData.measure_value
    );
  }
}