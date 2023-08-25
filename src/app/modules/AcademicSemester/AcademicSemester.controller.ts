import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AcademicSemester } from "@prisma/client";
import { academic_semester_service } from "./AcademicSemester.service";
import pick from "../../../shared/pick";
import { academic_semester_filter_keys } from "./AcademicSemester.constant";
import { paginationFields } from "../../../constants/pagination";

// Create a new semester
const AcademicSemesterCreate = catchAsync(
	async (req: Request, res: Response) => {
		//
		const { ...semester__data } = req.body;

		const result =
			await academic_semester_service.create_academic_semester(
				semester__data
			);

		sendResponse<AcademicSemester>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result,
			message: "Semester created successfully",
		});
	}
);

// GetAllAcademicSemesters
const GetAllAcademicSemesters = catchAsync(
	async (req: Request, res: Response) => {
		const filters = pick(req.query, academic_semester_filter_keys);
		const pagination = pick(req.query, paginationFields);

		const result =
			await academic_semester_service.get_academic_semesters({
				filters,
				pagination,
			});

		sendResponse<AcademicSemester[]>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result.data,
			meta: result.meta,
			message: "Semesters",
		});
	}
);
// GetAcademicSemester
const GetAcademicSemester = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await academic_semester_service.get_academic_semester(
		id as string
	);

	sendResponse<AcademicSemester>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,

		message: "Semester",
	});
});

export const AcademicSemesterController = {
	AcademicSemesterCreate,
	GetAllAcademicSemesters,
	GetAcademicSemester,
};

