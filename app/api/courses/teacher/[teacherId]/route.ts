import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { courseSchema } from "@/lib/validations/course";
import { authOptions } from "@/lib/auth";
import type { Enrollment, Course } from ".prisma/client";

export async function GET(
	req: Request,
	{ params }: { params: { teacherId: string } }
) {
	try {
		const { teacherId } = params;

		const enrollments = await db.enrollment.findMany({
			where: {
				course: {
					teacherId: teacherId,
				},
			},
			include: {
				course: true,
			},
		});

		const [courses, enrolledStudents] = await Promise.all([
			db.course.findMany({
				where: {
					teacherId: teacherId,
				},
			}),
			db.user.findMany({
				where: {
					id: {
						in: enrollments.map((e: Enrollment) => e.userId),
					},
				},
				select: {
					name: true,
					id: true,
					role: true,
				},
			}),
		]);

		const totalCourses = courses.length;
		const totalStudents = enrolledStudents;
		// console.log(enrolledStudents);

		// const totalStudents = new Set(
		// 	enrollments.map((e: Enrollment) => e.userId)
		// ).size;
		const totalRevenue = enrollments.reduce(
			(sum: number, enrollment: Enrollment & { course: Course }) =>
				sum + (enrollment.course?.price || 0),
			0
		);

		return NextResponse.json({
			totalStudents,
			totalCourses,
			totalRevenue,
			courses,
		});
	} catch (error) {
		console.error("[TEACHER_COURSE_GET]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: { teacherId: string } }
) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await db.course.findUnique({
			where: {
				id: params.teacherId,
			},
		});

		if (!course) {
			return new NextResponse("Not Found", { status: 404 });
		}

		if (course.teacherId !== session.user.id) {
			return new NextResponse("Forbidden", { status: 403 });
		}

		const json = await req.json();
		const body = courseSchema.parse(json);

		const updatedCourse = await db.course.update({
			where: {
				id: params.teacherId,
			},
			data: {
				...body,
			},
		});

		return NextResponse.json(updatedCourse);
	} catch (error) {
		console.error("[COURSE_PUT]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await db.course.findUnique({
			where: {
				id: params.courseId,
			},
		});

		if (!course) {
			return new NextResponse("Not Found", { status: 404 });
		}

		if (course.teacherId !== session.user.id) {
			return new NextResponse("Forbidden", { status: 403 });
		}

		await db.course.delete({
			where: {
				id: params.courseId,
			},
		});

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		console.error("[COURSE_DELETE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
