import { z } from "zod";
import { months } from "../../../constants/common";

export const room_create_validation = z.object({
	body: z.object({
		room_number: z.string({
			required_error: "Room number is required",
		}),
		floor: z.string({ required_error: "Floor is required" }),
		building_id: z.string({
			required_error: "Building id is required",
		}),
	}),
});

