import { Model } from 'objection';
import Space from './space';
import Room from './room';

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
			space: {
				relation: Model.BelongsToOneRelation,
				modelClass: Space,
				join: {
					from: 'houses.space_id',
					to: 'spaces.id',
				},
			},
			rooms: {
				relation: Model.HasManyRelation,
				modelClass: Room,
				join: {
					from: 'houses.id',
					to: 'rooms.house_id',
				},
			},
		};
	}
}
