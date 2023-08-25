import { z } from "zod";
import { months } from "../../../constants/common";

export const academic_faculty_create_validation = z.object({
	body: z.object({
		title: z.string({ required_error: "Title is required" }),
	}),
});

