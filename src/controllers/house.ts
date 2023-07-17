import House from '@/models/house';
import { isEmpty } from '@/utils';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
	try {
		const house = await House.query();

		await res.json({
			success: true,
			data: house,
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const getById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (isEmpty(id)) {
			throw new Error('An unexpected error has occurred');
		}

		// const house = await House.query().withGraphFetched('rooms').findById(id);
		const house = await House.query().findById(id);

		if (!house) {
			throw new Error('House not found');
		}

		await res.json({
			success: true,
			data: house,
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const create = async (req: Request, res: Response) => {
	try {
		let { name, space_id } = req.body;

		if (isEmpty(name)) {
			throw new Error('All fields must be fill');
		}

		await House.query().insert({ name, space_id });

		await res.json({
			success: true,
			message: 'House was created',
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const update = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, space_id } = req.body;

		const newData: any = {};

		if (isEmpty(id)) {
			throw new Error('An unexpected error has occurred');
		}

		const house = await House.query().findById(id);

		if (!house) {
			throw new Error('House not found');
		}

		if (!isEmpty(name)) {
			newData.name = name;
		}
		if (!isEmpty(space_id)) {
			newData.space_id = space_id;
		}

		const updatedHouse = await House.query().updateAndFetchById(id, newData);

		await res.json({
			success: true,
			message: 'House was updated',
			data: {
				id: updatedHouse.id,
				name: updatedHouse.name,
				space_id: updatedHouse.space_id,
			},
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const deleteHouse = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const house = await House.query().findById(id);

		if (!house) {
			throw new Error('House not found');
		}

		await House.query().deleteById(id);

		await res.json({
			success: true,
			message: 'House was deleted',
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};
