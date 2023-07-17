import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.hasTable('rooms').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('rooms', (table) => {
				table.increments('id').primary();
				table.text('name').notNullable();
				table.integer('house_id').unsigned();
				table.foreign('house_id').references('houses.id').onDelete('CASCADE');
				table.timestamp('date_added').defaultTo(knex.fn.now());
				table.timestamp('date_modified').defaultTo(knex.fn.now());
			});
		}
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('rooms');
}
