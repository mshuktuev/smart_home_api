import { Token, User } from '@/models';
import { isEmpty } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
/**
 * isAuth
 *
 * @param {string} access_token Токен пользователя
 * @returns {boolean} Статус авторизации
 */

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const bearerHeader = req.headers['authorization'];

		if (isEmpty(bearerHeader)) throw new Error('An unexpected error has occurred');

		const access_token = bearerHeader?.split(/\s/)[1];
		const user_token = await Token.query().findOne({
			access_token,
		});

		if (!user_token) throw new Error('An unexpected error has occurred');

		const user = await User.query().findOne({
			id: user_token.user_id,
		});

		if (!user) {
			throw new Error('An unexpected error has occurred');
		}

		await next();
	} catch (e: any) {
		await res
			.status(httpStatus.UNAUTHORIZED)
			.json({
				success: false,
				message: 'Unauthorized',
			})
			.end();
	}
};
