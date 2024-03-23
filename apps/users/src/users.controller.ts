import { CreateUserDto, UpdateUserDto } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { UserQuery } from './queries/impl/user';

@Controller()
export class UsersController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'findUser' })
  async findUser(@Ctx() context: RmqContext, @Payload() userId: string) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    channel.ack(message);

    return this.queryBus.execute(new UserQuery(userId));
  }

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
