import { z } from "zod";
import { months } from "../../../constants/common";

export const academic_department_create_validation = z.object({
	body: z.object({
		title: z.string({ required_error: "Title is required" }),
		academic_faculty_id: z.string({
			required_error: "Academic faculty is required",
		}),
	}),
});

