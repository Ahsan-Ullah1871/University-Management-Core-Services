import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentController } from "./AcademicDepartment.controller";
import { academic_department_create_validation } from "./AcademicDepartment.validation";

const router = express.Router();

router.post(
	"/create",
	validateRequest(academic_department_create_validation),
	AcademicDepartmentController.AcademicDepartmentCreate
);

router.get("/", AcademicDepartmentController.GetAllAcademicDepartments);

router.get("/:id", AcademicDepartmentController.GetAcademicDepartment);

export const AcademicDepartmentRoutes = router;

