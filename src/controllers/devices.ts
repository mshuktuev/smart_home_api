import Device from '@/models/device';
import { isEmpty } from '@/utils';
import { Request, Response } from 'express';
import { io } from '@/services/express';
import House from '@/models/house';
import Room from '@/models/room';

const deviceTypes = ['light', 'fan', 'switch', 'thermostat', 'conditioner', 'door', 'window', 'watering', 'socket', 'heating'];

export const getAll = async (req: Request, res: Response) => {
	try {
		const devices = await Device.query();

		await res.json({
			success: true,
			data: devices,
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};
export const getAllUnused = async (req: Request, res: Response) => {
	try {
		const devices = await Device.query().where('room_id', null);

		await res.json({
			success: true,
			data: devices,
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

		// const device = await Device.query().withGraphFetched('houses.rooms').findById(id);
		const device = await Device.query().findById(id);

		if (!device) {
			throw new Error('Device not found');
		}

		await res.json({
			success: true,
			data: device,
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
		let { name, type } = req.body;

		if (isEmpty(type) || isEmpty(name)) {
			throw new Error('All fields must be fill');
		}
		if (!deviceTypes.includes(type)) {
			throw new Error('Invalid type');
		}

		await Device.query().insert({
			name,
			type,
		});

		await res.json({
			success: true,
			message: 'Device was created',
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const detachDevice = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const device = await Device.query().findById(id);

		if (!device) {
			throw new Error('Device not found');
		}

		const updatedDevice = await Device.query().updateAndFetchById(id, {
			house_id: null,
			room_id: null,
		});

		await res.json({
			success: true,
			message: 'Device was updated',
			data: updatedDevice,
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const attachDevice = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { house_id, room_id, room_name } = req.body;

		const device = await Device.query().findById(id);

		if (!device) {
			throw new Error('Device not found');
		}

		const house = await House.query().findById(house_id);
		if (!house) {
			throw new Error('House not found');
		}
		let room;

		if (room_id) {
			room = await Room.query().findById(room_id);

			if (!room) {
				room = await Room.query().insertAndFetch({
					name: room_name,
					house_id,
				});
			}
		} else {
			room = await Room.query().insertAndFetch({
				name: room_name,
				house_id,
			});
		}

		const updatedDevice = await Device.query().updateAndFetchById(id, {
			house_id,
			room_id: room.id,
		});

		await res.json({
			success: true,
			message: 'Device was updated',
			data: updatedDevice,
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
		const { name, type, x, y, active, temperature, warning, enabled } = req.body;

		const device = await Device.query().findById(id);

		if (!device) {
			throw new Error('Device not found');
		}
		if (!deviceTypes.includes(type)) {
			throw new Error('Invalid type');
		}
		const newData: any = {};
		console.log(x, y);

		if (!isEmpty(name)) {
			newData.name = name;
		}
		if (!isEmpty(type)) {
			newData.type = type;
		}
		if (x !== undefined) {
			newData.x = x;
		}
		if (y !== undefined) {
			newData.y = y;
		}
		if (active !== undefined) {
			newData.active = active;
		}
		if (temperature !== undefined) {
			newData.temperature = temperature;
		}
		if (warning !== undefined) {
			newData.warning = warning;
		}
		if (enabled !== undefined) {
			newData.enabled = enabled;
		}
		console.log(newData);

		const updatedDevice = await Device.query().updateAndFetchById(id, newData);

		await res.json({
			success: true,
			message: 'Device was updated',
			data: updatedDevice,
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};
export const updateDeviceInfo = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const { active, temperature, warning, enabled } = req.body;

		if (!id) {
			throw new Error('Device not found');
		}

		const device = await Device.query().findById(id);

		if (!device) {
			throw new Error('Device not found');
		}
		const newData: any = {};

		if (active !== undefined) {
			newData.active = active;
		}
		if (temperature !== undefined) {
			newData.temperature = temperature;
		}
		if (warning !== undefined) {
			newData.warning = warning;
		}
		if (enabled !== undefined) {
			newData.enabled = enabled;
		}

		const updatedDevice = await Device.query().updateAndFetchById(id, newData);
		io.emit('deviceUpdated', updatedDevice);

		await res.json({
			success: true,
			message: 'Device was updated',
			data: updatedDevice,
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};
export const updateDevicePosition = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const { x, y } = req.body;

		if (!id) {
			throw new Error('Device not found');
		}

		const device = await Device.query().findById(id);

		if (!device) {
			throw new Error('Device not found');
		}

		const updatedDevice = await Device.query().updateAndFetchById(id, { x, y });
		io.emit('deviceUpdated', updatedDevice);

		await res.json({
			success: true,
			message: 'Device was updated',
			data: updatedDevice,
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const deleteDevice = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const device = await Device.query().findById(id);

		if (!device) {
			throw new Error('Device not found');
		}

		await Device.query().deleteById(id);

		await res.json({
			success: true,
			message: 'Device was deleted',
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};
