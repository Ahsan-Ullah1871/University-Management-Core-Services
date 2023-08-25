import { Prisma, Student } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IStudentFilters } from "./Student.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./Student.condition";

//
const create_student = async (student: Student): Promise<Student> => {
	const result = await prisma.student.create({
		data: student,
	});

	return result;
};

//
const get_students = async ({
	filters,
	pagination,
}: {
	filters: IStudentFilters;
	pagination: IPaginationOptions;
}): Promise<IGenericResponse<Student[] | null>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(pagination);

	const whereConditions: Prisma.StudentWhereInput =
		GetWhereConditions(filters);

	//
	const result = await prisma.student.findMany({
		where: whereConditions,
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});

	const total = await prisma.student.count();

	return {
		meta: {
			total,
			page,
			limit,
		},
		data: result,
	};
};

//get_student
const get_student = async (id: string): Promise<Student | null> => {
	//
	const result = await prisma.student.findUnique({
		where: {
			id,
		},
	});

	return result;
};

export const student_service = {
	create_student,
	get_students,
	get_student,
};

