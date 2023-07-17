import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.hasTable('users').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('users', (table) => {
				table.increments('id').primary();
				table.string('username').notNullable();
				table.string('email').notNullable();
				table.text('password').notNullable();
				table.boolean('is_admin').notNullable().defaultTo(false);
				table.timestamp('date_added').defaultTo(knex.fn.now());
				table.timestamp('date_modified').defaultTo(knex.fn.now());
			});
		}
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('users');
}
