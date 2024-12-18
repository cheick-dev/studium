import { TeacherStats } from "@/types/teacher.type";

export async function getTeacherStats(
	teacherId: string
): Promise<TeacherStats> {
	const response = await fetch(`/api/courses/teacher/${teacherId}`);
	if (!response.ok) {
		throw new Error("Failed to fetch teacher stats");
	}
	const data = await response.json();

	return data;
}
