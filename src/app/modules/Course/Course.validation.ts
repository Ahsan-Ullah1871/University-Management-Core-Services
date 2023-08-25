import { z } from "zod";
import { months } from "../../../constants/common";

export const course_create_validation = z.object({
	body: z.object({
		title: z.string({
			required_error: "Title is required",
		}),
		code: z.string({ required_error: "Code is required" }),
		credits: z.number({
			required_error: "Credits is required",
		}),
	}),
});

