import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categorySchema } from "@/lib/validations/category";
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
		const body = categorySchema.parse(json);

		const category = await db.category.create({
			data: {
				...body,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.error("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function GET() {
	try {
		const categories = await db.category.findMany();
		return NextResponse.json(categories);
	} catch (error) {
		console.error("[CATEGORIES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
