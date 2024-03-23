import { BaseRepository } from '../base-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { User } from 'apps/users/src/user';
import { UserSchemaFactory } from '@app/common/database/entities/user-schema.factory';

@Injectable()
export class UserRepository
  extends BaseRepository<UserEntity, User>
{
  constructor(
    @InjectRepository(UserEntity)
    userRepository: Repository<UserEntity>,
    userSchemaFactory: UserSchemaFactory,
  ) {
    super(userRepository, userSchemaFactory);
  }
}
