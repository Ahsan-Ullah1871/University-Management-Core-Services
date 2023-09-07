export type ISemesterRegistration = {
	id?: string;
	search?: string;
	start_date?: Date;
	end_date?: Date;
	status?: IStatus;
	min_credit?: number;
	max_credit?: number;
};

export enum IStatus {
	UPCOMING,
	ONGOING,
	ENDED,
}
