import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Faculty } from "@prisma/client";
import { faculty_service } from "./Faculty.service";
import pick from "../../../shared/pick";
import { faculty_filter_keys } from "./Faculty.constant";
import { paginationFields } from "../../../constants/pagination";

//   FacultyCreate
const FacultyCreate = catchAsync(async (req: Request, res: Response) => {
	//
	const { ...faculty_data } = req.body;

	const result = await faculty_service.create_faculty(faculty_data);

	sendResponse<Faculty>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Faculty created successfully",
	});
});

// GetAllFaculties
const GetAllFaculties = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, faculty_filter_keys);
	const pagination = pick(req.query, paginationFields);

	const result = await faculty_service.get_faculties({
		filters,
		pagination,
	});

	sendResponse<Faculty[]>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result.data,
		meta: result.meta,
		message: "faculties",
	});
});
// GetFaculty
const GetFaculty = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await faculty_service.get_faculty(id as string);

	sendResponse<Faculty>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Faculty",
	});
});

export const FacultyController = {
	FacultyCreate,
	GetAllFaculties,
	GetFaculty,
};

