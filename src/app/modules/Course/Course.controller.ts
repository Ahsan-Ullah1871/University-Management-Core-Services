import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {
	AcademicDepartment,
	AcademicSemester,
	Building,
	Course,
	CourseFaculty,
	Room,
} from "@prisma/client";
import { course_service } from "./Course.service";
import pick from "../../../shared/pick";
import { course_filter_keys } from "./Course.constant";
import { paginationFields } from "../../../constants/pagination";

// Create
const CourseCreate = catchAsync(async (req: Request, res: Response) => {
	//
	const { ...course_data } = req.body;

	const result = await course_service.create_course(course_data);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Course created successfully",
	});
});

// Create
const CourseUpdate = catchAsync(async (req: Request, res: Response) => {
	//
	const { ...course_data } = req.body;

	const result = await course_service.update_course(
		req.params.id,
		course_data
	);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Course updated successfully",
	});
});

//
const GetAllCourses = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, course_filter_keys);
	const pagination = pick(req.query, paginationFields);

	const result = await course_service.get_courses({
		filters,
		pagination,
	});

	sendResponse<Course[]>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result.data,
		meta: result.meta,
		message: "Courses",
	});
});

//
const GetCourse = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await course_service.get_course(id as string);

	sendResponse<Course>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,

		message: "Course",
	});
});

//
const AssignCourse = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const { ...assign_data } = req.body;

	const result = await course_service.assign_course(
		assign_data,
		id as string
	);

	sendResponse<CourseFaculty[]>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Course Assigned to faculty successfully",
	});
});

//
const RemoveAssignedCourse = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const { ...assign_data } = req.body;

	const result = await course_service.remove_assign_course(
		assign_data,
		id as string
	);

	sendResponse<CourseFaculty[]>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Course removed from faculty successfully",
	});
});

export const CourseController = {
	CourseCreate,
	GetAllCourses,
	GetCourse,
	CourseUpdate,
	RemoveAssignedCourse,
	AssignCourse,
};

