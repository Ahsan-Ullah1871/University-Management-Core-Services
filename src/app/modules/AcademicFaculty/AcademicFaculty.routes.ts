import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyController } from "./AcademicFaculty.controller";
import { academic_faculty_create_validation } from "./AcademicFaculty.validation";

const router = express.Router();

router.post(
	"/create",
	validateRequest(academic_faculty_create_validation),
	AcademicFacultyController.AcademicFacultyCreate
);

router.get("/", AcademicFacultyController.GetAllAcademicFaculties);

router.get("/:id", AcademicFacultyController.GetAcademicFaculty);

export const AcademicFacultyRoutes = router;

