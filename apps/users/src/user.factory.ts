import { EntityFactory } from '@app/common';
import { User } from './user';
import { v4 as uuid } from 'uuid';

export class UserFactory implements EntityFactory<User> {
  create(name: string, email: string, password: string): User {
    return new User(uuid(), name, email, password);
  }
}
