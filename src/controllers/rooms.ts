import Room from '@/models/room';
import { isEmpty } from '@/utils';
import { Request, Response } from 'express';
import { io } from '@/services/express';

export const getAll = async (req: Request, res: Response) => {
	try {
		const room = await Room.query();

		await res.json({
			success: true,
			data: room,
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
		io.emit('room', id);

		const room = await Room.query().findById(id);

		if (!room) {
			throw new Error('Room not found');
		}

		await res.json({
			success: true,
			data: room,
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
		let { name, house_id } = req.body;

		if (isEmpty(name)) {
			throw new Error('All fields must be fill');
		}

		await Room.query().insert({ name, house_id });

		await res.json({
			success: true,
			message: 'Room was created',
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
		const { name, house_id } = req.body;

		const newData: any = {};

		if (isEmpty(id)) {
			throw new Error('An unexpected error has occurred');
		}

		const room = await Room.query().findById(id);

		if (!room) {
			throw new Error('Room not found');
		}

		if (!isEmpty(name)) {
			newData.name = name;
		}
		if (!isEmpty(house_id)) {
			newData.space_id = house_id;
		}

		const updatedRoom = await Room.query().updateAndFetchById(id, newData);

		await res.json({
			success: true,
			message: 'Room was updated',
			data: {
				id: updatedRoom.id,
				name: updatedRoom.name,
				space_id: updatedRoom.house_id,
			},
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const deleteRoom = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const room = await Room.query().findById(id);

		if (!room) {
			throw new Error('Room not found');
		}

		await Room.query().deleteById(id);

		await res.json({
			success: true,
			message: 'Room was deleted',
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};
