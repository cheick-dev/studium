import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		return new Response("Unauthorized", { status: 401 });
	}

	try {
		const enrollments = await db.enrollment.findMany({
			where: { userId: session.user.id },
			include: { course: true },
		});

		return Response.json(enrollments);
	} catch (error) {
		return new Response("Error fetching enrollments", { status: 500 });
	}
}

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		return new Response("Unauthorized", { status: 401 });
	}

	const json = await req.json();
	const course = await db.course.findUnique({
		where: { id: json.courseId },
		include: { teacher: true },
	});

	if (!course) {
		return new Response("Course not found", { status: 404 });
	}

	if (course.teacherId === session.user.id) {
		return new Response("You are not authorized to enroll in this course", {
			status: 401,
		});
	}

	const existingEnrollment = await db.enrollment.findFirst({
		where: {
			AND: [{ userId: session.user.id }, { courseId: json.courseId }],
		},
	});

	if (existingEnrollment) {
		return new Response("Enrollment already exists", { status: 409 });
	}

	await db.enrollment.create({
		data: {
			userId: session.user.id,
			courseId: course.id,
		},
	});
	// return NextResponse.json(enrollment);
	return new Response("Enrollment successful", { status: 200 });
}

export async function DELETE(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		return new Response("Unauthorized", { status: 401 });
	}

	const json = await req.json();
	const existingEnrollment = await db.enrollment.findFirst({
		where: {
			AND: [{ userId: session.user.id }, { courseId: json.courseId }],
		},
	});

	if (!existingEnrollment) {
		return new Response("Enrollment not found", { status: 404 });
	}

	await db.enrollment.delete({
		where: { id: existingEnrollment.id },
	});

	return new Response("Unenrollment successful", { status: 200 });
}
