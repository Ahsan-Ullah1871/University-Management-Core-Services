import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseController } from "./Course.controller";
import { course_create_validation } from "./Course.validation";

const router = express.Router();

router.post(
	"/create",
	validateRequest(course_create_validation),
	CourseController.CourseCreate
);

router.get("/", CourseController.GetAllCourses);

router.get("/:id", CourseController.GetCourse);

export const CourseRoutes = router;

