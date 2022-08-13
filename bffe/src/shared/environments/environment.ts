import { ENV } from './env';

export const environment: ENV = {
  production: true,
  database: {
    port: 3306,
    host: 'localhost',
    user: {
      user: 'root',
      password: '1234',
    },
  },
};
