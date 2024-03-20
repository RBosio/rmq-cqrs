import { RmqModule, USER_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule.register({ name: USER_SERVICE }),
  ],
})
export class UserModule {}
