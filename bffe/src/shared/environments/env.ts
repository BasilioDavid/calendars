export interface ENV {
  production: boolean;
  database: {
    name: string;
    port: number;
    host: string;
    user: {
      user: string;
      password: string;
    };
  };
}
