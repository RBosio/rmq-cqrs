import { PrimaryColumn, DeleteDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @DeleteDateColumn()
  deleted_at: Date;
}
