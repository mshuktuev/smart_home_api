import { Model } from 'objection';
import House from './house';

export default class Space extends Model {
	id!: number;
	name!: string;
	date_added!: Date;
	date_modified!: Date;

	static get tableName() {
		return 'spaces';
	}

	static get relationMappings() {
		return {
			houses: {
				relation: Model.HasManyRelation,
				modelClass: House,
				join: {
					from: 'spaces.id',
					to: 'houses.space_id',
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
