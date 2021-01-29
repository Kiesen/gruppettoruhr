import * as Knex from 'knex';

import USER_TABLE from '../consts/tables';

export async function up(knex: Knex): Promise<void> {
  const { TABLE_NAME, COLUMN_NAMES } = USER_TABLE;
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements(COLUMN_NAMES.ID).notNullable().unique();
    table.uuid(COLUMN_NAMES.UUID).notNullable();
    table.string(COLUMN_NAMES.USERNAME).notNullable().unique();
    table.string(COLUMN_NAMES.EMAIL).notNullable().unique();
    table.string(COLUMN_NAMES.PASSWORD).notNullable();
    table.integer(COLUMN_NAMES.FAILED_LOGIN_ATTEMPTS).defaultTo(0);
    table
      .timestamp(COLUMN_NAMES.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp(COLUMN_NAMES.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  const { TABLE_NAME } = USER_TABLE;
  return knex.schema.dropTable(TABLE_NAME);
}
