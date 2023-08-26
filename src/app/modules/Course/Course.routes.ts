import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseController } from "./Course.controller";
import {
	course_assign_validation,
	course_create_validation,
	course_update_validation,
	remove_course_assigned_validation,
} from "./Course.validation";

const router = express.Router();

router.post(
	"/create",
	validateRequest(course_create_validation),
	CourseController.CourseCreate
);

router.get("/", CourseController.GetAllCourses);
router.get("/:id", CourseController.GetCourse);

router.post(
	"/:id/assign",
	validateRequest(course_assign_validation),
	CourseController.AssignCourse
);
router.delete(
	"/:id/remove-assign",
	validateRequest(remove_course_assigned_validation),
	CourseController.RemoveAssignedCourse
);

router.patch(
	"/:id",
	validateRequest(course_update_validation),
	CourseController.CourseUpdate
);

export const CourseRoutes = router;

