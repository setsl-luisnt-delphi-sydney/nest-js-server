import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'AUTH_DATABASE_PROVIDE',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'auth',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        schema: 'auth',
      }),
  },
];
