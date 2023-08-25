import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BuildingController } from "./Buildng.controller";
import { building_create_validation } from "./Buildng.validation";

const router = express.Router();

router.post(
	"/create",
	validateRequest(building_create_validation),
	BuildingController.BuildingCreate
);

router.get("/", BuildingController.GetAllBuildings);

router.get("/:id", BuildingController.GetBuilding);

export const BuildingRoutes = router;

