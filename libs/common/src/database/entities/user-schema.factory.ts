import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from './entity-schema.factory';
import { UserEntity } from './user.entity';
import { User } from 'apps/users/src/user';

@Injectable()
export class UserSchemaFactory
  implements EntitySchemaFactory<UserEntity, User>
{
  create(user: User): UserEntity {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      deleted_at: null,
    };
  }

  createFromSchema(userSchema: UserEntity): User {
    return new User(
      userSchema.id,
      userSchema.name,
      userSchema.email,
      userSchema.password,
    );
  }
}
