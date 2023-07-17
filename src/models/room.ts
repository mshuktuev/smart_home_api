import { Model } from 'objection';
import House from './house';

export default class Room extends Model {
	id!: number;
	name!: string;
	house_id!: number;
	date_added!: Date;
	date_modified!: Date;

	static get tableName() {
		return 'rooms';
	}

	static get relationMappings() {
		return {
			space: {
				relation: Model.BelongsToOneRelation,
				modelClass: House,
				join: {
					from: 'rooms.house_id',
					to: 'houses.id',
				},
			},
		};
	}

	async $beforeInsert() {
		this.date_added = new Date();
	}

	async $beforeUpdate(context: any) {
		this.date_modified = new Date();
	}
}
