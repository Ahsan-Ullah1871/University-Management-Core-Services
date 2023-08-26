export type ICourseFilterRequest = {
	id?: string;
	search?: string;
	title?: string;
	code?: string;
	credits?: number;
};

export type ICourse = {
	title: string;
	code: string;
	credits: number;
	prerequisite_courses?: IPrerequisiteCourse[];
};

export type IPrerequisiteCourse = {
	course_id: string;
	is_delete?: boolean;
};

export type ICourseAssign = {
	faculty_id: string[];
};
