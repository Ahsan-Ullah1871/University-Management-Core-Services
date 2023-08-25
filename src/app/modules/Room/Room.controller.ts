import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {
	AcademicDepartment,
	AcademicSemester,
	Building,
	Room,
} from "@prisma/client";
import { room_service } from "./Room.service";
import pick from "../../../shared/pick";
import { room_filter_keys } from "./Room.constant";
import { paginationFields } from "../../../constants/pagination";

// Create
const RoomCreate = catchAsync(async (req: Request, res: Response) => {
	//
	const { ...room_data } = req.body;

	const result = await room_service.create_room(room_data);

	sendResponse<Room>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Room created successfully",
	});
});

//
const GetAllRooms = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, room_filter_keys);
	const pagination = pick(req.query, paginationFields);

	const result = await room_service.get_rooms({
		filters,
		pagination,
	});

	sendResponse<Room[]>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result.data,
		meta: result.meta,
		message: "Rooms",
	});
});
//
const GetRoom = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await room_service.get_room(id as string);

	sendResponse<Room>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,

		message: "Room",
	});
});

export const RoomController = {
	RoomCreate,
	GetAllRooms,
	GetRoom,
};

