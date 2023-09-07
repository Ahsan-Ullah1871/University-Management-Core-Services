import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {
	AcademicDepartment,
	AcademicSemester,
	Building,
	Room,
	SemesterRegistration,
} from "@prisma/client";
import { semester_registration_service } from "./SemesterRegistration.service";
import pick from "../../../shared/pick";
import { semester_registration_filter_keys } from "./SemesterRegistration.constant";
import { paginationFields } from "../../../constants/pagination";

// Create
const SemesterRegistrationCreate = catchAsync(
	async (req: Request, res: Response) => {
		//
		const { ...semester_rag_data } = req.body;

		const result =
			await semester_registration_service.create_semester_registration(
				semester_rag_data
			);

		sendResponse<SemesterRegistration>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result,
			message: "Semester registration created successfully",
		});
	}
);

//
const GetAllSemesterRegistrationsList = catchAsync(
	async (req: Request, res: Response) => {
		const filters = pick(
			req.query,
			semester_registration_filter_keys
		);
		const pagination = pick(req.query, paginationFields);

		const result =
			await semester_registration_service.get_semester_registrations(
				{
					filters,
					pagination,
				}
			);

		sendResponse<SemesterRegistration[]>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result.data,
			meta: result.meta,
			message: "semester_registration",
		});
	}
);
//
const GetSemesterRegistration = catchAsync(
	async (req: Request, res: Response) => {
		const { id } = req.params;

		const result =
			await semester_registration_service.get_semester_registration(
				id as string
			);

		sendResponse<Room>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result,

			message: "semester_registration",
		});
	}
);

export const SemesterRegistrationController = {
	SemesterRegistrationCreate,
	GetAllSemesterRegistrationsList,
	GetSemesterRegistration,
};

