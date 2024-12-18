import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { courseSchema } from "@/lib/validations/course";
import { authOptions } from "@/lib/auth";

export async function GET(
	req: Request,
	{ params }: { params: { enrollId: string } }
) {
	const courseId = params.enrollId.split("-")[0];
	const userId = params.enrollId.split("-")[1];
	try {
		const enrollment = await db.enrollment.findFirst({
			where: {
				AND: [{ userId: userId }, { courseId: courseId }],
			},
		});
		if (enrollment === null) {
			return NextResponse.json(false);
		}

		return NextResponse.json(true);
	} catch (error) {
		console.error("[ENROLL_GET]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
