"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { TeacherStats } from "@/types/teacher.type";
import { getTeacherStats } from "@/services/teacher-service";

export function useTeacherStats() {
	const { data: session } = useSession();
	const [stats, setStats] = useState<TeacherStats>({
		totalStudents: [],
		totalCourses: 0,
		totalRevenue: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function fetchStats() {
			if (!session?.user?.id) return;
			try {
				const data = await getTeacherStats(session.user.id as string);
				setStats(data);
			} catch (e) {
				setError(e as Error);
			} finally {
				setLoading(false);
			}
		}

		fetchStats();
	}, [session?.user?.id]);

	return { stats, loading, error };
}
