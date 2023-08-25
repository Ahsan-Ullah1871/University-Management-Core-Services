import { AcademicDepartment, AcademicSemester, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAcademicDepartmentFilterRequest } from "./AcademicDepartment.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./AcademicDepartment.condition";

//
const create_academic_department = async (
	department_data: AcademicDepartment
): Promise<AcademicDepartment> => {
	const result = await prisma.academicDepartment.create({
		data: department_data,
	});

	return result;
};

//
const get_academic_departments = async ({
	filters,
	pagination,
}: {
	filters: IAcademicDepartmentFilterRequest;
	pagination: IPaginationOptions;
}): Promise<IGenericResponse<AcademicDepartment[] | null>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(pagination);

	const whereConditions: Prisma.AcademicDepartmentWhereInput =
		GetWhereConditions(filters);

	//
	const result = await prisma.academicDepartment.findMany({
		where: whereConditions,
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});

	const total = await prisma.academicDepartment.count();

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
const get_academic_department = async (
	id: string
): Promise<AcademicDepartment | null> => {
	//
	const result = await prisma.academicDepartment.findUnique({
		where: {
			id,
		},
	});

	return result;
};

export const academic_department_service = {
	create_academic_department,
	get_academic_departments,
	get_academic_department,
};

