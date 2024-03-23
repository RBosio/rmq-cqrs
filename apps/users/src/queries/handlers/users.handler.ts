import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersQuery } from '../impl/users';
import { User } from '../../user';
import { UserRepository } from '@app/common';

@QueryHandler(UsersQuery)
export class UsersQueryHandler implements IQueryHandler<UsersQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
