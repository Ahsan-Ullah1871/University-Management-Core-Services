import { Response } from "express";

type IApiReponse<T> = {
	status_code: number;
	success: boolean;
	message?: string | null;
	meta?: {
		page: number;
		limit: number;
		total: number;
	};
	data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
	const responseData: IApiReponse<T> = {
		status_code: data.status_code,
		success: data.success,
		message: data.message || null,
		meta: data.meta || null || undefined,
		data: data.data || null || undefined,
	};

	res.status(data.status_code).json(responseData);
};

export default sendResponse;

