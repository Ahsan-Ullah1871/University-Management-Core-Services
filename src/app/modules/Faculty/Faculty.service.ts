import { Faculty, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IFacultyFilters } from "./Faculty.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./Faculty.condition";

//
const create_faculty = async (faculty: Faculty): Promise<Faculty> => {
	const result = await prisma.faculty.create({
		data: faculty,
	});

	return result;
};

//
const get_faculties = async ({
	filters,
	pagination,
}: {
	filters: IFacultyFilters;
	pagination: IPaginationOptions;
}): Promise<IGenericResponse<Faculty[] | null>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(pagination);

	const whereConditions: Prisma.FacultyWhereInput =
		GetWhereConditions(filters);

	//
	const result = await prisma.faculty.findMany({
		where: whereConditions,
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});

	const total = await prisma.faculty.count();

	return {
		meta: {
			total,
			page,
			limit,
		},
		data: result,
	};
};

//get_faculty
const get_faculty = async (id: string): Promise<Faculty | null> => {
	//
	const result = await prisma.faculty.findUnique({
		where: {
			id,
		},
	});

	return result;
};

export const faculty_service = {
	create_faculty,
	get_faculties,
	get_faculty,
};

