import {
	AcademicDepartment,
	AcademicSemester,
	Building,
	Prisma,
} from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBuildingFilterRequest } from "./Buildng.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./Buildng.condition";

//
const create_building = async (building_data: Building): Promise<Building> => {
	const result = await prisma.building.create({
		data: building_data,
	});

	return result;
};

//
const get_buildings = async ({
	filters,
	pagination,
}: {
	filters: IBuildingFilterRequest;
	pagination: IPaginationOptions;
}): Promise<IGenericResponse<Building[] | null>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(pagination);

	const whereConditions: Prisma.BuildingWhereInput =
		GetWhereConditions(filters);

	//
	const result = await prisma.building.findMany({
		where: whereConditions,
		skip,
		take: limit,
		orderBy: { [sortBy]: sortOrder },
	});

	const total = await prisma.building.count();

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
const get_building = async (id: string): Promise<Building | null> => {
	//
	const result = await prisma.building.findUnique({
		where: {
			id,
		},
	});

	return result;
};

export const building_service = {
	create_building,
	get_buildings,
	get_building,
};

