import { CreateUserDto, UpdateUserDto } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';

@Controller()
export class UsersController {
  constructor(private commandBus: CommandBus) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(
    @Ctx() context: RmqContext,
    @Payload() createUserDto: CreateUserDto,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    channel.ack(message);

    await this.commandBus.execute(new CreateUserCommand(createUserDto));

    return true;
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(
    @Ctx() context: RmqContext,
    @Payload() data: { userId: string; updateUserDto: UpdateUserDto },
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    channel.ack(message);

    await this.commandBus.execute(
      new UpdateUserCommand(data.userId, data.updateUserDto),
    );

    return true;
  }
}
