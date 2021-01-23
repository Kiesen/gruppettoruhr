import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const POSTGRES_PORT = process.env.POSTGRES_PORT
  ? parseInt(process.env.POSTGRES_PORT, 10)
  : 5432;

const config: knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
    charset: 'utf8',
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

export default config;
