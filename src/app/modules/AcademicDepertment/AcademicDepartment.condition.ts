import { academic_department_search_keys } from "./AcademicDepartment.constant";
import { IAcademicDepartmentFilterRequest } from "./AcademicDepartment.interface";

export const GetWhereConditions = (
	filters: IAcademicDepartmentFilterRequest
) => {
	const { search, ...filterData } = filters;
	const andConditions = [];

	if (search) {
		andConditions.push({
			OR: academic_department_search_keys.map((field) => ({
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

