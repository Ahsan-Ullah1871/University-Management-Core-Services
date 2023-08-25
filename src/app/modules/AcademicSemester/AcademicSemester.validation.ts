import { z } from "zod";
import { months } from "../../../constants/common";

export const academic_semester_create_validation = z.object({
	body: z.object({
		year: z.number({ required_error: "Year is required" }),
		title: z.string({ required_error: "Title is required" }),
		code: z.string({ required_error: "Code is required" }),
		start_month: z.enum([...months] as [string, ...string[]], {
			required_error: "Start month is required",
		}),
		end_month: z.enum([...months] as [string, ...string[]], {
			required_error: "End month is required",
		}),
	}),
});

