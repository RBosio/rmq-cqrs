import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

export interface BaseRepositoryInterface<T> {
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findOneById(id: string): Promise<T>;
  findOneByOptions(options: FindOneOptions<T>): Promise<T>;
  create(data: DeepPartial<T>): T;
  save(data: DeepPartial<T>): Promise<T>;
}
