import { Model } from 'objection';
import Room from './room';
import House from './house';

export default class Device extends Model {
	id!: number;
	name!: string;
	type!: string;
	enabled!: boolean;
	active!: boolean;
	x!: number;
	y!: number;
	temperature?: number;
	room_id?: number | null;
	house_id?: number | null;
	warning?: boolean;
	date_added!: Date;
	date_modified!: Date;

	static get tableName() {
		return 'devices';
	}

	static get relationMappings() {
		return {
			room: {
				relation: Model.BelongsToOneRelation,
				modelClass: Room,
				join: {
					from: 'devices.room_id',
					to: 'rooms.id',
				},
			},
			house: {
				relation: Model.BelongsToOneRelation,
				modelClass: House,
				join: {
					from: 'devices.house_id',
					to: 'house.id',
				},
			},
		};
	}
}
