import { z } from "zod";
import { months } from "../../../constants/common";

export const semester_registration_create_validation = z.object({
	body: z.object({
		start_date: z.date({
			required_error: "start_date number is required",
		}),
		end_date: z.date({
			required_error: "end_date number is required",
		}),
		min_credit: z.number({
			required_error: "min_credit is required",
		}),
		max_credit: z.number({
			required_error: "max_credit is required",
		}),
	}),
});

