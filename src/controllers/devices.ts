import Device from '@/models/device';
import { isEmpty } from '@/utils';
import { Request, Response } from 'express';
import { io } from '@/services/express';

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
		let { name } = req.body;

		if (isEmpty(name)) {
			throw new Error('All fields must be fill');
		}

		await Device.query().insert({ name });

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

export const update = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, type, enabled, room_id } = req.body;

		const device = await Device.query().findById(id);

		if (!device) {
			throw new Error('Device not found');
		}
		const newData: any = {};

		if (!isEmpty(name)) {
			newData.name = name;
		}
		if (!isEmpty(type)) {
			newData.type = type;
		}
		if (!isEmpty(enabled)) {
			newData.enabled = enabled;
		}
		if (!isEmpty(room_id)) {
			newData.room_id = room_id;
		}

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
		const { active, temperature, warning } = req.body;

		const device = await Device.query().findById(id);

		if (!device) {
			throw new Error('Device not found');
		}
		const newData: any = {};

		if (!isEmpty(active)) {
			newData.active = active;
		}
		if (!isEmpty(temperature)) {
			newData.temperature = temperature;
		}
		if (!isEmpty(warning)) {
			newData.warning = warning;
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
