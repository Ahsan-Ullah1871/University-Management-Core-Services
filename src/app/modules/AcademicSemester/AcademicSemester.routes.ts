import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academic_semester_create_validation } from "./AcademicSemester.validation";
import { AcademicSemesterController } from "./AcademicSemester.controller";

const router = express.Router();

router.post(
	"/create",
	validateRequest(academic_semester_create_validation),
	AcademicSemesterController.AcademicSemesterCreate
);

router.get("/", AcademicSemesterController.GetAllAcademicSemesters);

router.get("/:id", AcademicSemesterController.GetAcademicSemester);

export const AcademicSemesterRoutes = router;

