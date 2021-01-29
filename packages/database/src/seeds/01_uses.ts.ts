import * as Knex from 'knex';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import USER_TABLE from '../consts/tables';
import { CreateUser } from '../types/user';

dotenv.config({ path: '../../.env' });

/**
 * Warning
 *
 * This seed file should only be used during development
 * and is not made for production! If you want to seed users
 * for a production environment you should use a different
 * approach e.g. seeding manually or within a CI pipeline
 *
 */
export async function seed(knex: Knex): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    const users: CreateUser[] = [
      {
        uuid: uuidv4(),
        username: 'development',
        password: 'development',
        email: 'development',
      },
    ];
    await knex(USER_TABLE.TABLE_NAME).del();
    await knex(USER_TABLE.TABLE_NAME).insert(users);
  }
}
