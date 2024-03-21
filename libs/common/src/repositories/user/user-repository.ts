import { UserEntity } from '@app/common/database/entities/user.entity';
import { BaseRepository } from '../base-repository';
import { UserRepositoryInterface } from './user-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserRepository
  extends BaseRepository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
}
