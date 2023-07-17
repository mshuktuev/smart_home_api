import { NextFunction, Request, Response } from 'express';
import { User } from '@/models';
import { Token } from '@/models';
import { isEmpty } from '@/utils';

/**
 * Authentication
 *
 * @param { string } username Имя пользователя
 * @param { string } password Пароль пользователя
 * @return {json} Возвращает статус обработки запроса и JWT ключи авторизации, в случае ее успешного завершения
 */

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (isEmpty(email) || isEmpty(password)) throw new Error('All fields must be fill');

		const user = await User.query().findOne({ email });

		if (!user) throw new Error('User not found');

		const verifyPassword = await user.verifyPassword(password);

		if (!verifyPassword) throw new Error('Incorrect username or password');

		const access_token = await user.getAccessToken();
		const refresh_token = await user.getRefreshToken();

		const user_token = await Token.query().insert({
			user_id: user.id,
			access_token,
			refresh_token,
		});

		if (!user_token) throw new Error('An unexpected error has occurred');

		await res.json({
			success: true,
			data: {
				id: user.id,
				access_token,
				refresh_token,
			},
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};

/**
 * Refresh
 * @returns {json} Возвращает статус обработки запроса и JWT новые ключи авторизации, в случае ее успешного завершения
 */
export const refresh = async (req: Request, res: Response) => {
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

		user_token.verifyAccessToken();
		user_token.verifyRefreshToken();

		if (!user) throw new Error('An unexpected error has occurred');

		const new_access_token = await user.getAccessToken();
		const new_refresh_token = await user.getRefreshToken();
		const newUA = await user_token.getUA(req.header('User-Agent'));

		await Token.query().patch({
			access_token: new_access_token,
			refresh_token: new_refresh_token,
			ua: newUA,
		});

		await res.json({
			success: true,
			data: {
				id: user.id,
				access_token: new_access_token,
				refresh_token: new_refresh_token,
			},
		});
	} catch (e: any) {
		await res.json({
			success: false,
			message: e.message || e,
		});
	}
};
