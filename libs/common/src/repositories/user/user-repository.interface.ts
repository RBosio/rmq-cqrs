import { UserEntity } from '@app/common';
import { BaseRepositoryInterface } from '../base-repository.interface';

export interface UserRepositoryInterface
  extends BaseRepositoryInterface<UserEntity> {}
