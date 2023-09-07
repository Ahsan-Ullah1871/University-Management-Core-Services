import {
	AcademicDepartment,
	AcademicSemester,
	Building,
	Prisma,
	Room,
	SemesterRegistration,
} from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ISemesterRegistration } from "./SemesterRegistration.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./SemesterRegistration.condition";

//
const create_semester_registration = async (
	semester_registration: SemesterRegistration
): Promise<SemesterRegistration> => {
	const result = await prisma.semesterRegistration.create({
		data: semester_registration,
	});
	return result;
};

//
const get_semester_registrations = async ({
	filters,
	pagination,
}: {
	filters: ISemesterRegistration;
	pagination: IPaginationOptions;
}): Promise<IGenericResponse<SemesterRegistration[] | null>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(pagination);

	const whereConditions: Prisma.SemesterRegistrationWhereInput =
		GetWhereConditions(filters);

	//
	const result = await prisma.semesterRegistration.findMany({
		where: whereConditions,
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});

	const total = await prisma.room.count();

	return {
		meta: {
			total,
			page,
			limit,
		},
		data: result,
	};
};

//
const get_semester_registration = async (id: string): Promise<Room | null> => {
	//
	const result = await prisma.room.findUnique({
		where: {
			id,
		},
	});

	return result;
};

export const semester_registration_service = {
	create_semester_registration,
	get_semester_registrations,
	get_semester_registration,
};

