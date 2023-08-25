import { generic_error_type } from "./error";

export type IGenericResponse<T> = {
	meta: {
		page: number;
		limit: number;
		total: number;
	};
	data: T;
};

export type IGenericErrorResponse = {
	statusCode: number;
	message: string;
	errorMessages: generic_error_type[];
};

export type modified_error_res_type = {
	status_code: number;
	message: string;
	errorMessages: generic_error_type[];
};

export type error_res_type = {
	success: boolean;
	message: string;
	errorMessages: generic_error_type[];
	stack?: string | undefined;
};

export type IMeta = {
	page: number;
	limit: number;
	total: number;
};

export type GenericResponse<T> = {
	meta: IMeta;
	data: T;
};

export type IUserRole = "admin" | "student" | "faculty";

export type IGender = "male" | "female";

export type IBloodGroup =
	| "A+"
	| "A-"
	| "B+"
	| "B-"
	| "AB+"
	| "AB-"
	| "O+"
	| "O-";

export type IMonth =
	| "January"
	| "February"
	| "March"
	| "April"
	| "May"
	| "June"
	| "July"
	| "August"
	| "September"
	| "October"
	| "November"
	| "December";

