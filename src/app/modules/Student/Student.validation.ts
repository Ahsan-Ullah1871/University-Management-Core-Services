import { z } from "zod";
import { blood_groups, gender_list, months } from "../../../constants/common";

export const student_create_validation = z.object({
	body: z.object({
		student_id: z
			.string({ required_error: "student id is required" })
			.optional(),
		first_name: z.string({
			required_error: "First name is required",
		}),
		last_name: z.string({ required_error: "Last name is required" }),
		middle_name: z
			.string({ required_error: "Middle name is required" })
			.optional(),
		profile_image: z
			.string({ required_error: "Profile image is required" })
			.optional(),
		email: z.string({ required_error: "email is required" }),
		contact_no: z.string({
			required_error: "Contact No is required",
		}),
		gender: z.enum([...gender_list] as [string, ...string[]], {
			required_error: "Gender is required",
		}),
		blood_group: z.enum([...blood_groups] as [string, ...string[]], {
			required_error: "Blood group is required",
		}),
		academic_department_id: z.string({
			required_error: "Academic department id required",
		}),
		academic_semester_id: z.string({
			required_error: "Academic semester id is required",
		}),
		academic_faculty_id: z.string({
			required_error: "Academic faculty id is required",
		}),
	}),
});

