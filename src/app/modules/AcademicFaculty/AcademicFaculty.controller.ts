import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {
	AcademicDepartment,
	AcademicFaculty,
	AcademicSemester,
} from "@prisma/client";
import { academic_faculty_service } from "./AcademicFaculty.service";
import pick from "../../../shared/pick";
import { academic_faculty_filter_keys } from "./AcademicFaculty.constant";
import { paginationFields } from "../../../constants/pagination";

// Create a new semester
const AcademicFacultyCreate = catchAsync(
	async (req: Request, res: Response) => {
		//
		const { ...academic_faculty_data } = req.body;

		const result =
			await academic_faculty_service.create_academic_faculty(
				academic_faculty_data
			);

		sendResponse<AcademicFaculty>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result,
			message: "Academic faculty created successfully",
		});
	}
);

// GetAllAcademicSemesters
const GetAllAcademicFaculties = catchAsync(
	async (req: Request, res: Response) => {
		const filters = pick(req.query, academic_faculty_filter_keys);
		const pagination = pick(req.query, paginationFields);

		const result =
			await academic_faculty_service.get_academic_faculties({
				filters,
				pagination,
			});

		sendResponse<AcademicFaculty[]>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result.data,
			meta: result.meta,
			message: "Academic faculties",
		});
	}
);
// GetAcademicSemester
const GetAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await academic_faculty_service.get_academic_faculty(
		id as string
	);

	sendResponse<AcademicFaculty>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,

		message: "Academic faculty",
	});
});

export const AcademicFacultyController = {
	AcademicFacultyCreate,
	GetAllAcademicFaculties,
	GetAcademicFaculty,
};

