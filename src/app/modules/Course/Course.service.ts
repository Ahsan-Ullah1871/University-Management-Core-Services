import { Course, CourseFaculty, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import {
	ICourse,
	ICourseAssign,
	ICourseFilterRequest,
	IPrerequisiteCourse,
} from "./Course.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./Course.condition";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ForLoop } from "../../../shared/ForLoop";

//
const create_course = async (course_data: ICourse): Promise<ICourse | null> => {
	const { prerequisite_courses, ...course_related_data } = course_data;

	const newCourse = await prisma.$transaction(
		async (transactionClient) => {
			const result = await transactionClient.course.create({
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
				ForLoop(
					prerequisite_courses,
					async (element: IPrerequisiteCourse) => {
						const createPrerequisite =
							await transactionClient.courseToPreRequisite.create(
								{
									data: {
										prerequisite_id:
											element.course_id,
										course_id: result.id,
									},
								}
							);
					}
				);
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

//  update course
export const update_course = async (
	id: string,
	course_data: ICourse
): Promise<any> => {
	const { prerequisite_courses, ...course_related_data } = course_data;

	const newCourse = await prisma.$transaction(
		async (transactionClient) => {
			const result = await transactionClient.course.update({
				where: {
					id,
				},
				data: course_related_data,
			});

			if (!result) {
				throw new ApiError(
					httpStatus.BAD_REQUEST,
					"Unable to update course"
				);
			}

			if (
				prerequisite_courses &&
				prerequisite_courses?.length > 0
			) {
				const delete_list = prerequisite_courses.filter(
					(it) => it.is_delete
				);
				const new_adding_list = prerequisite_courses.filter(
					(it) => !it.is_delete
				);

				// delete prerequisites
				if (delete_list?.length > 0) {
					ForLoop(
						delete_list,
						async (
							element: IPrerequisiteCourse
						) => {
							const deletePrerequisite =
								await transactionClient.courseToPreRequisite.deleteMany(
									{
										where: {
											AND: [
												{
													course_id: result.id,
												},
												{
													prerequisite_id:
														element.course_id,
												},
											],
										},
									}
								);
						}
					);
				}

				// add new prerequisite
				if (new_adding_list?.length > 0) {
					ForLoop(
						new_adding_list,
						async (
							element: IPrerequisiteCourse
						) => {
							const createPrerequisite =
								await transactionClient.courseToPreRequisite.create(
									{
										data: {
											prerequisite_id:
												element.course_id,
											course_id: result.id,
										},
									}
								);
						}
					);
				}

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

//assign_course
const assign_course = async (
	assign_data: ICourseAssign,
	id: string
): Promise<CourseFaculty[] | null> => {
	const result = await prisma.courseFaculty.createMany({
		data: assign_data.faculty_id.map((item) => ({
			faculty_id: item,
			course_id: id,
		})),
	});

	const assignFacultiesData = await prisma.courseFaculty.findMany({
		where: {
			course_id: id,
		},
		include: {
			faculty: true,
			course: true,
		},
	});

	return assignFacultiesData;
};

//assign_course
const remove_assign_course = async (
	assign_data: ICourseAssign,
	id: string
): Promise<CourseFaculty[] | null> => {
	const result = await prisma.courseFaculty.deleteMany({
		where: {
			course_id: id,
			faculty_id: {
				in: assign_data?.faculty_id,
			},
		},
	});

	const assignFacultiesData = await prisma.courseFaculty.findMany({
		where: {
			course_id: id,
		},
		include: {
			faculty: true,
			course: true,
		},
	});

	return assignFacultiesData;
};

export const course_service = {
	create_course,
	get_courses,
	get_course,
	update_course,
	assign_course,
	remove_assign_course,
};

