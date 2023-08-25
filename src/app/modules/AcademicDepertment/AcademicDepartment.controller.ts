import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AcademicDepartment, AcademicSemester } from "@prisma/client";
import { academic_department_service } from "./AcademicDepartment.service";
import pick from "../../../shared/pick";
import { academic_department_filter_keys } from "./AcademicDepartment.constant";
import { paginationFields } from "../../../constants/pagination";

// Create a new semester
const AcademicDepartmentCreate = catchAsync(
	async (req: Request, res: Response) => {
		//
		const { ...semester__data } = req.body;

		const result =
			await academic_department_service.create_academic_department(
				semester__data
			);

		sendResponse<AcademicDepartment>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result,
			message: "Department created successfully",
		});
	}
);

// GetAllAcademicSemesters
const GetAllAcademicDepartments = catchAsync(
	async (req: Request, res: Response) => {
		const filters = pick(req.query, academic_department_filter_keys);
		const pagination = pick(req.query, paginationFields);

		const result =
			await academic_department_service.get_academic_departments(
				{
					filters,
					pagination,
				}
			);

		sendResponse<AcademicDepartment[]>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result.data,
			meta: result.meta,
			message: "Departments",
		});
	}
);
// GetAcademicSemester
const GetAcademicDepartment = catchAsync(
	async (req: Request, res: Response) => {
		const { id } = req.params;

		const result =
			await academic_department_service.get_academic_department(
				id as string
			);

		sendResponse<AcademicDepartment>(res, {
			status_code: httpStatus.OK,
			success: true,
			data: result,

			message: "Department",
		});
	}
);

export const AcademicDepartmentController = {
	AcademicDepartmentCreate,
	GetAllAcademicDepartments,
	GetAcademicDepartment,
};

