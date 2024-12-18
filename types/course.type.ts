export interface Course {
	id: string;
	title: string;
	description: string;
	image?: string;
	price?: number;
	teacher?: {
		name: string;
	};
	category?: {
		name: string;
	};
	hasVideo: boolean;
	hasPdf: boolean;
}

export interface EnrolledCourse {
	id: string;
	userId: string;
	courseId: string;
	progress: number;
	createdAt: Date;
	course: {
		title: string;
		description: string;
		videoUrl: string | null;
		pdfUrl: string | null;
	};
}
