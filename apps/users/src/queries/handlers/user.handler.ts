import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserQuery } from '../impl/user';
import { User } from '../../user';
import { UserRepository } from '@app/common';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

@QueryHandler(UserQuery)
export class UserQueryHandler implements IQueryHandler<UserQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: UserQuery): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user)
      throw new RpcException({
        message: 'user not found',
        status: HttpStatus.NOT_FOUND,
      });

    return user;
  }
}
