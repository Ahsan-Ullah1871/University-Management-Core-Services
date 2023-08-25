import { academic_semester_search_keys } from "./AcademicSemester.constant";
import { IAcademicSemesterFilterRequest } from "./AcademicSemester.interface";

export const GetWhereConditions = (filters: IAcademicSemesterFilterRequest) => {
	const { search, ...filterData } = filters;
	const andConditions = [];

	if (search) {
		andConditions.push({
			OR: academic_semester_search_keys.map((field) => ({
				[field]: {
					contains: search,
					mode: "insensitive",
				},
			})),
		});
	}

	if (Object.keys(filterData).length > 0) {
		andConditions.push({
			AND: Object.keys(filterData).map((key) => ({
				[key]: {
					equals: (filterData as any)[key],
				},
			})),
		});
	}

	return andConditions?.length > 0 ? { AND: andConditions } : {};
};

