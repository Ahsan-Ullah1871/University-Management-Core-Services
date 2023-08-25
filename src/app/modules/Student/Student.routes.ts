import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { student_create_validation } from "./Student.validation";
import { StudentController } from "./Student.controller";

const router = express.Router();

router.post(
	"/create",
	validateRequest(student_create_validation),
	StudentController.StudentCreate
);

router.get("/", StudentController.GetAllStudents);

router.get("/:id", StudentController.GetStudent);

export const StudentRoutes = router;

