"use client";

import CoursePreview from "@/components/courses/preview";

import { useSession } from "next-auth/react";
import { useEnrollmentStore } from "./store";

export default function View({ course }: any) {
	const { data: session } = useSession();
	const { isEnrolled } = useEnrollmentStore();

	if (session?.user.role === "TEACHER") {
		return (
			<div className="prose max-w-none mb-6">
				<CoursePreview data={course.content} />
			</div>
		);
	}

	return (
		<div className="p-6 mb-6">
			<div className="mb-4">
				{session?.user.role === "STUDENT" && isEnrolled ? (
					<CoursePreview data={course.content} />
				) : (
					<CoursePreview data={course.description} />
				)}
			</div>
		</div>
	);
}
