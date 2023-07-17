import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.hasTable('houses').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('houses', (table) => {
				table.increments('id').primary();
				table.text('name').notNullable();
				table.integer('space_id').unsigned();
				table.foreign('space_id').references('spaces.id').onDelete('CASCADE');
				table.timestamp('date_added').defaultTo(knex.fn.now());
				table.timestamp('date_modified').defaultTo(knex.fn.now());
			});
		}
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('houses');
}
