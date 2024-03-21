import { RmqModule, USER_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { ErrorHandlerModule } from '../error/error-handler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule.register({ name: USER_SERVICE }),
    ErrorHandlerModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
