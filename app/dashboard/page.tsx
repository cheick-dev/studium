"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { StudentDashboard } from "@/components/dashboard/student";
import { TeacherDashboard } from "@/components/dashboard/teacher";
import { Loader } from "@/components/Loader";

export default function DashboardPage() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <Loader />;
	}

	if (!session) {
		redirect("/login");
	}

	return (
		<>
			{session.user?.role === "TEACHER" ? (
				<div>
					<TeacherDashboard />
				</div>
			) : (
				<StudentDashboard />
			)}
		</>
	);
}
