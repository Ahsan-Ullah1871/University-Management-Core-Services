import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Student } from "@prisma/client";
import { student_service } from "./Student.service";
import pick from "../../../shared/pick";
import { student_filter_keys } from "./Student.constant";
import { paginationFields } from "../../../constants/pagination";

// Create a new student
const StudentCreate = catchAsync(async (req: Request, res: Response) => {
	//
	const { ...student_data } = req.body;

	const result = await student_service.create_student(student_data);

	sendResponse<Student>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Student created successfully",
	});
});

// GetAllStudents
const GetAllStudents = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, student_filter_keys);
	const pagination = pick(req.query, paginationFields);

	const result = await student_service.get_students({
		filters,
		pagination,
	});

	sendResponse<Student[]>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result.data,
		meta: result.meta,
		message: "Students",
	});
});
// GetStudent
const GetStudent = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await student_service.get_student(id as string);

	sendResponse<Student>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,

		message: "Student",
	});
});

export const StudentController = {
	StudentCreate,
	GetAllStudents,
	GetStudent,
};

