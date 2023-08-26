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

export const course_update_validation = z.object({
	body: z.object({
		title: z
			.string({
				required_error: "Title is required",
			})
			.optional(),
		code: z.string({ required_error: "Code is required" }).optional(),
		credits: z
			.number({
				required_error: "Credits is required",
			})
			.optional(),
	}),
});

export const course_assign_validation = z.object({
	body: z.object({
		faculty_id: z
			.string({
				required_error: "faculty_id is required",
			})
			.array(),
	}),
});

export const remove_course_assigned_validation = z.object({
	body: z.object({
		faculty_id: z
			.string({
				required_error: "faculty_id is required",
			})
			.array()
			.optional(),
	}),
});

