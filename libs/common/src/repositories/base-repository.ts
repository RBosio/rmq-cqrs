import {
  FindManyOptions,
  FindOneOptions,
  DeepPartial,
  Repository,
} from 'typeorm';
import { BaseRepositoryInterface } from './base-repository.interface';

interface HasId {
  id: string;
}

export abstract class BaseRepository<T extends HasId>
  implements BaseRepositoryInterface<T>
{
  private readonly entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options);
  }

  async findOneById(id: any): Promise<T> {
    const options: FindOneOptions<T> = {
      where: {
        id,
      },
    };
    return this.entity.findOne(options);
  }

  async findOneByOptions(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(options);
  }

  create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  async save(data: DeepPartial<T>): Promise<T> {
    return this.entity.save(data);
  }
}
