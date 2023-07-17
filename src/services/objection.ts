import config from '@/config';
import Knex from 'knex';
import { Model } from 'objection';

// Initialize knex.

export const connect = async () => {
    const knex = Knex({
        client: config.db.client,
        connection: {
            host: config.db.host,
            user: config.db.username,
            password: config.db.password,
            database: config.db.database,
        }
    });

    //DEBUG
    // knex.on('query', console.log)

    Model.knex(knex);
};