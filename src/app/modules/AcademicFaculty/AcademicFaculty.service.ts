import {
	AcademicDepartment,
	AcademicFaculty,
	AcademicSemester,
	Prisma,
} from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAcademicFacultyFilterRequest } from "./AcademicFaculty.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./AcademicFaculty.condition";

//
const create_academic_faculty = async (
	faculty_data: AcademicFaculty
): Promise<AcademicFaculty> => {
	const result = await prisma.academicFaculty.create({
		data: faculty_data,
	});

	return result;
};

//
const get_academic_faculties = async ({
	filters,
	pagination,
}: {
	filters: IAcademicFacultyFilterRequest;
	pagination: IPaginationOptions;
}): Promise<IGenericResponse<AcademicFaculty[] | null>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(pagination);

	const whereConditions: Prisma.AcademicFacultyWhereInput =
		GetWhereConditions(filters);

	//
	const result = await prisma.academicFaculty.findMany({
		where: whereConditions,
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});

	const total = await prisma.academicFaculty.count();

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
const get_academic_faculty = async (
	id: string
): Promise<AcademicFaculty | null> => {
	//
	const result = await prisma.academicFaculty.findUnique({
		where: {
			id,
		},
	});

	return result;
};

export const academic_faculty_service = {
	create_academic_faculty,
	get_academic_faculties,
	get_academic_faculty,
};

