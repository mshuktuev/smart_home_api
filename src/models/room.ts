import { Model } from 'objection';
import House from './house';
import Device from './device';

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
			devices: {
				relation: Model.HasManyRelation,
				modelClass: Device,
				join: {
					from: 'rooms.id',
					to: 'devices.room_id',
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
