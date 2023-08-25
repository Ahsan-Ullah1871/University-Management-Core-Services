import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomController } from "./Room.controller";
import { room_create_validation } from "./Room.validation";

const router = express.Router();

router.post(
	"/create",
	validateRequest(room_create_validation),
	RoomController.RoomCreate
);

router.get("/", RoomController.GetAllRooms);

router.get("/:id", RoomController.GetRoom);

export const RoomRoutes = router;

