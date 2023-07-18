import { Model } from 'objection';
import Room from './room';

export default class Device extends Model {
	id!: number;
	name!: string;
	type!: string;
	enabled!: boolean;
	active!: boolean;
	temperature?: number;
	room_id?: number;
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
		};
	}
}
