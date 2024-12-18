import { db } from "@/lib/db";

export async function getEnrolledCourses(userId: string) {
	const enrollments = await db.enrollment.findMany({
		where: {
			userId,
		},
		include: {
			course: {
				select: {
					title: true,
					description: true,
					videoUrl: true,
					pdfUrl: true,
				},
			},
		},
	});

	return enrollments;
}
