import { Course, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICourseFilterRequest } from "./Course.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./Course.condition";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

//
const create_course = async (course_data: any): Promise<any> => {
	const { prerequisite_courses, ...course_related_data } = course_data;

	const newCourse = await prisma.$transaction(
		async (transactionClient) => {
			const result = await prisma.course.create({
				data: course_related_data,
			});

			if (!result) {
				throw new ApiError(
					httpStatus.BAD_REQUEST,
					"Unable to create course"
				);
			}

			if (
				prerequisite_courses &&
				prerequisite_courses?.length > 0
			) {
				for (
					let index = 0;
					index < prerequisite_courses.length;
					index++
				) {
					const element = prerequisite_courses[index];
					const createPrerequisite =
						await prisma.courseToPreRequisite.create(
							{
								data: {
									prerequisite_id:
										element.course_id,
									course_id: result.id,
								},
							}
						);
				}
			}

			return result;
		}
	);

	if (newCourse) {
		const responseData = await prisma.course.findUnique({
			where: {
				id: newCourse.id,
			},
			include: {
				prerequisite_courses: {
					include: {
						prerequisite_course: true,
					},
				},
				prerequisite_for: {
					include: {
						prerequisite_for: true,
					},
				},
			},
		});

		return responseData;
	}

	throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course");
};

//
const get_courses = async ({
	filters,
	pagination,
}: {
	filters: ICourseFilterRequest;
	pagination: IPaginationOptions;
}): Promise<IGenericResponse<Course[] | null>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(pagination);

	const whereConditions: Prisma.CourseWhereInput =
		GetWhereConditions(filters);

	//
	const result = await prisma.course.findMany({
		where: whereConditions,
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});

	const total = await prisma.course.count();

	return {
		meta: {
			total,
			page,
			limit,
		},
		data: result,
	};
};

//get_academic_semester
const get_course = async (id: string): Promise<Course | null> => {
	//
	const result = await prisma.course.findUnique({
		where: {
			id,
		},
	});

	return result;
};

export const course_service = {
	create_course,
	get_courses,
	get_course,
};

