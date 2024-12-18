import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { courseSchema } from "@/lib/validations/course";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (session.user.role !== "TEACHER") {
			return new NextResponse("Forbidden", { status: 403 });
		}

		const json = await req.json();
		const body = courseSchema.parse(json);
		console.log(body);

		const course = await db.course.create({
			data: {
				...body,
				teacherId: session.user.id,
			},
		});

		return NextResponse.json(course);
	} catch (error) {
		console.error("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function GET() {
	try {
		const courses = await db.course.findMany({
			include: {
				teacher: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(courses);
	} catch (error) {
		console.error("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
