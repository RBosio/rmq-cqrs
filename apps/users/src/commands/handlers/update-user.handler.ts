import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app/common';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';
import { UpdateUserCommand } from '../impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, updateUserDto }: UpdateUserCommand): Promise<any> {
    const userFounded = await this.userRepository.findOneById(id);
    if (!userFounded) {
      throw new RpcException({
        message: 'user not found',
        status: HttpStatus.NOT_FOUND,
      });
    }

    const userUpdated = Object.assign(userFounded, updateUserDto);

    await this.userRepository.save(userUpdated);

    return true;
  }
}
