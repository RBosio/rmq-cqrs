import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { UserFactory } from '../../user.factory';
import { UserRepository } from '@app/common';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userFactory: UserFactory,
    private userRepository: UserRepository,
  ) {}

  async execute({ createUserDto }: CreateUserCommand): Promise<any> {
    const { name, email, password } = createUserDto;
    const user = this.userFactory.create(name, email, password);

    const userFounded = await this.userRepository.findOneByOptions({
      where: {
        email: user.getEmail(),
      },
    });
    if (userFounded) {
      throw new RpcException({
        message: 'email already exists',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    await this.userRepository.save(user);

    return true;
  }
}
