import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { faculty_create_validation } from "./Faculty.validation";
import { FacultyController } from "./Faculty.controller";

const router = express.Router();

router.post(
	"/create",
	validateRequest(faculty_create_validation),
	FacultyController.FacultyCreate
);

router.get("/", FacultyController.GetAllFaculties);

router.get("/:id", FacultyController.GetFaculty);

export const FacultyRoutes = router;

