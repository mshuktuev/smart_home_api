import Space from '@/models/space';
import { isEmpty } from '@/utils';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
	try {
		const spaces = await Space.query().withGraphFetched('houses');

		await res.json({
			success: true,
			data: spaces,
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

		// const space = await Space.query().withGraphFetched('houses.rooms').findById(id);
		const space = await Space.query().findById(id).withGraphFetched('houses');

		if (!space) {
			throw new Error('Space not found');
		}

		await res.json({
			success: true,
			data: space,
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
		let { name } = req.body;

		if (isEmpty(name)) {
			throw new Error('All fields must be fill');
		}

		await Space.query().insert({ name });

		await res.json({
			success: true,
			message: 'Space was created',
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
		const { name } = req.body;

		if (isEmpty(name)) {
			throw new Error('All fields must be fill');
		}

		const space = await Space.query().findById(id);

		if (!space) {
			throw new Error('Space not found');
		}

		const updatedSpace = await Space.query().updateAndFetchById(id, { name });

		await res.json({
			success: true,
			message: 'Space was updated',
			data: {
				id: updatedSpace.id,
				name: updatedSpace.name,
			},
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const deleteSpace = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const space = await Space.query().findById(id);

		if (!space) {
			throw new Error('Space not found');
		}

		await Space.query().deleteById(id);

		await res.json({
			success: true,
			message: 'Space was deleted',
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};
