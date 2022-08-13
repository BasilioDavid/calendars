export interface ENV {
  production: boolean;
  database: {
    port: number;
    host: string;
    user: {
      user: string;
      password: string;
    };
  };
}
