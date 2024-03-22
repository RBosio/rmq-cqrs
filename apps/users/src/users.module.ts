import { Module } from '@nestjs/common';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule,
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
