import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface ICarCreationAttr {
  car_id: number;
  car_name: string;
  car_name2: string;
  // brand: string;
  // price: number;
  // model: string;

  yuvish: string;
}
@Table({ tableName: 'car' })
export class Car extends Model<Car, ICarCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  car_id: number;

  @Column({
    type: DataType.STRING,
  })
  car_name: string;

  @Column({
    type: DataType.STRING,
  })
  car_name2: string;

  @Column({
    type: DataType.STRING,
  })
  yuvish: string;
}
