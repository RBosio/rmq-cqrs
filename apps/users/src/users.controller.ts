import { CreateUserDto } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateUserCommand } from './commands/impl/create-user.command';

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
}
