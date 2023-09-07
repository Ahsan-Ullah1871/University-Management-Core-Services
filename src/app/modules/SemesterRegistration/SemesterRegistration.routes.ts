import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationController } from "./SemesterRegistration.controller";
import { semester_registration_create_validation } from "./SemesterRegistration.validation";

const router = express.Router();

router.post(
	"/create",
	validateRequest(semester_registration_create_validation),
	SemesterRegistrationController.SemesterRegistrationCreate
);

router.get("/", SemesterRegistrationController.GetAllSemesterRegistrationsList);

router.get("/:id", SemesterRegistrationController.GetSemesterRegistration);

export const SemesterRegistrationRoutes = router;

