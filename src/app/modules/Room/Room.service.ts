import {
	AcademicDepartment,
	AcademicSemester,
	Building,
	Prisma,
	Room,
} from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBuildingRoomRequest } from "./Room.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GetWhereConditions } from "./Room.condition";

//
const create_room = async (room_data: Room): Promise<Room> => {
	const result = await prisma.room.create({
		data: room_data,
	});

	return result;
};

//
const get_rooms = async ({
	filters,
	pagination,
}: {
	filters: IBuildingRoomRequest;
	pagination: IPaginationOptions;
}): Promise<IGenericResponse<Room[] | null>> => {
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(pagination);

	const whereConditions: Prisma.RoomWhereInput =
		GetWhereConditions(filters);

	//
	const result = await prisma.room.findMany({
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

//get_academic_semester
const get_room = async (id: string): Promise<Room | null> => {
	//
	const result = await prisma.room.findUnique({
		where: {
			id,
		},
	});

	return result;
};

export const room_service = {
	create_room,
	get_rooms,
	get_room,
};

