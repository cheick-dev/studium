import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { EnrolledCourse } from "@/types/course.type";
import { getEnrolledCourses } from "@/services/enrollment-service";

export function useEnrolledCourses() {
	const { data: session } = useSession();
	const [courses, setCourses] = useState<EnrolledCourse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function fetchCourses() {
			if (!session?.user?.id) return;

			try {
				const data = await getEnrolledCourses(
					session.user.id as string
				);
				setCourses(data);
			} catch (e) {
				setError(e as Error);
			} finally {
				setLoading(false);
			}
		}

		fetchCourses();
	}, [session?.user?.id]);

	return { courses, loading, error };
}
