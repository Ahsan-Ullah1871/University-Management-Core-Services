import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AcademicDepartment, AcademicSemester, Building } from "@prisma/client";
import { building_service } from "./Buildng.service";
import pick from "../../../shared/pick";
import { building_filter_keys } from "./Buildng.constant";
import { paginationFields } from "../../../constants/pagination";

// Create
const BuildingCreate = catchAsync(async (req: Request, res: Response) => {
	//
	const { ...building__data } = req.body;

	const result = await building_service.create_building(building__data);

	sendResponse<Building>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Building created successfully",
	});
});

//
const GetAllBuildings = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, building_filter_keys);
	const pagination = pick(req.query, paginationFields);

	const result = await building_service.get_buildings({
		filters,
		pagination,
	});

	sendResponse<Building[]>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result.data,
		meta: result.meta,
		message: "Buildings",
	});
});
//
const GetBuilding = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await building_service.get_building(id as string);

	sendResponse<Building>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,

		message: "Building",
	});
});

export const BuildingController = {
	BuildingCreate,
	GetAllBuildings,
	GetBuilding,
};

