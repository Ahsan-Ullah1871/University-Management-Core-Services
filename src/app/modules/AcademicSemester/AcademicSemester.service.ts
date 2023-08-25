import { AcademicSemester, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAcademicSemesterFilterRequest } from "./AcademicSemester.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./AcademicSemester.condition";

//
const create_academic_semester = async (
	semester_data: AcademicSemester
): Promise<AcademicSemester> => {
	const result = await prisma.academicSemester.create({
		data: semester_data,
	});

	return result;
};

//
const get_academic_semesters = async ({
	filters,
	pagination,
}: {
	filters: IAcademicSemesterFilterRequest;
	pagination: IPaginationOptions;
}): Promise<IGenericResponse<AcademicSemester[] | null>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(pagination);

	const whereConditions: Prisma.AcademicSemesterWhereInput =
		GetWhereConditions(filters);

	//
	const result = await prisma.academicSemester.findMany({
		where: whereConditions,
		skip,
		take: limit,
		// orderBy: { [sortBy]: sortOrder },
	});

	const total = await prisma.academicSemester.count();

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
const get_academic_semester = async (
	id: string
): Promise<AcademicSemester | null> => {
	//
	const result = await prisma.academicSemester.findUnique({
		where: {
			id,
		},
	});

	const total = await prisma.academicSemester.count();

	return result;
};

export const academic_semester_service = {
	create_academic_semester,
	get_academic_semesters,
	get_academic_semester,
};

