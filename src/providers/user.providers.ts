import { Connection, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['AUTH_DATABASE_PROVIDE'],
  },
];
