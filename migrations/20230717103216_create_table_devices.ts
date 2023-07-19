import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.hasTable('devices').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('devices', (table) => {
				table.increments('id').primary();
				table.text('name').notNullable();
				table.integer('room_id').unsigned();
				table.foreign('room_id').references('rooms.id');
				table.integer('house_id').unsigned();
				table.foreign('house_id').references('houses.id');
				table.text('type').notNullable();
				table.boolean('enabled').defaultTo(true);
				table.boolean('active').defaultTo(false);
				table.integer('x').defaultTo(0);
				table.integer('y').defaultTo(0);
				table.boolean('warning').nullable().defaultTo(null);
				table.integer('temperature').nullable().defaultTo(null);
				table.timestamp('date_added').defaultTo(knex.fn.now());
				table.timestamp('date_modified').defaultTo(knex.fn.now());
			});
		}
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('devices');
}
