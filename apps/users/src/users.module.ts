import { Module } from '@nestjs/common';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, UserEntity, UserRepository } from '@app/common';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFactory } from './user.factory';
import { UserSchemaFactory } from '@app/common/database/entities/user-schema.factory';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    UserRepository,
    UserFactory,
    UserSchemaFactory,
  ],
})
export class UsersModule {}
