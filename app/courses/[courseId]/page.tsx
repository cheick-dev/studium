import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

import SubscribeButton from "./SubscribeButton";
import View from "./View";

export default async function CoursePage({
	params,
}: {
	params: { courseId: string };
}) {
	const session = await getServerSession(authOptions);
	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
		},
		include: {
			teacher: true,
			comments: {
				include: {
					user: true,
				},
				orderBy: {
					createdAt: "desc",
				},
			},
		},
	});

	if (!course) {
		notFound();
	}

	return (
		<div className="container mx-auto py-10">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between">
					<div>
						<h1 className="text-3xl font-bold mb-4">
							{course.title}
						</h1>
						<span className="text-sm font-semibold mb-6">
							Créé par{" "}
							<span className="font-bold text-lg">
								{course.teacher?.name}
							</span>
						</span>
					</div>
					{session?.user && session.user.role !== "TEACHER" && (
						<SubscribeButton courseId={course.id} />
					)}
				</div>
				<View course={course} />
			</div>
		</div>
	);
}
