import { FacultyRoutes } from "./../modules/Faculty/Faculty.routes";
import express from "express";
import { AcademicSemesterRoutes } from "../modules/AcademicSemester/AcademicSemester.routes";
import { StudentRoutes } from "../modules/Student/Student.routes";
import { AcademicDepartmentRoutes } from "../modules/AcademicDepertment/AcademicDepartment.routes";
import { AcademicFacultyRoutes } from "../modules/AcademicFaculty/AcademicFaculty.routes";
import { BuildingRoutes } from "../modules/Building/Buildng.routes";
import { RoomRoutes } from "../modules/Room/Room.routes";
import { CourseRoutes } from "../modules/Course/Course.routes";

const router = express.Router();

const moduleRoutes = [
	// ... routes
	{
		path: "/academic-semesters",
		route: AcademicSemesterRoutes,
	},
	{
		path: "/academic-departments",
		route: AcademicDepartmentRoutes,
	},
	{
		path: "/academic-faculty",
		route: AcademicFacultyRoutes,
	},
	{
		path: "/student",
		route: StudentRoutes,
	},
	{
		path: "/faculty",
		route: FacultyRoutes,
	},
	{
		path: "/building",
		route: BuildingRoutes,
	},
	{
		path: "/room",
		route: RoomRoutes,
	},
	{
		path: "/course",
		route: CourseRoutes,
	},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

