import { Model } from 'objection';
import Room from './room';
import Device from './device';

export default class House extends Model {
	id!: number;
	name!: string;
	space_id!: number;
	date_added!: Date;
	date_modified!: Date;

	static get tableName() {
		return 'houses';
	}

	async $beforeInsert() {
		this.date_added = new Date();
	}

	async $beforeUpdate(context: any) {
		this.date_modified = new Date();
	}

	static get relationMappings() {
		return {
			rooms: {
				relation: Model.HasManyRelation,
				modelClass: Room,
				join: {
					from: 'houses.id',
					to: 'rooms.house_id',
				},
			},
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
}
