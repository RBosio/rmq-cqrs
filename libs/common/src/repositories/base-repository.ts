import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { EntitySchemaFactory } from '../database/entities/entity-schema.factory';
import { AggregateRoot } from '@nestjs/cqrs';

interface HasId {
  id: string;
  deleted_at: Date;
}

export abstract class BaseRepository<
  TSchema extends HasId,
  TEntity extends AggregateRoot,
> {
  private readonly entity: Repository<TSchema>;
  constructor(
    entity: Repository<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {
    this.entity = entity;
  }

  async findAll(options?: FindManyOptions<TSchema>): Promise<TEntity[]> {
    return (await this.entity.find(options)).map((entity) =>
      this.entitySchemaFactory.createFromSchema(entity),
    );
  }

  async findOneById(id: any): Promise<TEntity> {
    const options: FindOneOptions<TSchema> = {
      where: {
        id,
      },
    };

    const entity = await this.entity.findOne(options);
    if (!entity) return null;

    return this.entitySchemaFactory.createFromSchema(entity);
  }

  async findOneByOptions(options: FindOneOptions<TSchema>): Promise<TEntity> {
    const entity = await this.entity.findOne(options);
    if (!entity) return null;

    return this.entitySchemaFactory.createFromSchema(entity);
  }

  async save(entity: TEntity): Promise<void> {
    const newEntity = this.entity.create(
      this.entitySchemaFactory.create(entity),
    );

    this.entity.save(newEntity);
  }
}
