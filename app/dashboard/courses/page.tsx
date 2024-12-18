"use client";

import { CourseCard } from "@/components/courses/course-card";
import { CourseFilter } from "@/components/courses/course-filter";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCourseStore } from "@/store/course-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnrolledCourse } from "@/types/course.type";
import { Progress } from "@/components/ui/progress";

export default function CoursesPage() {
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(
		[]
	);

	const { data: session } = useSession();

	const isTeacher = session?.user?.role === "TEACHER";
	const isStudent = session?.user?.role === "STUDENT";

	const { courses, setCourses } = useCourseStore();

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				if (isTeacher) {
					console.log("teacher");
					const teacherId = session.user.id;
					const response = await fetch(
						`/api/courses/teacher/${teacherId}`
					);
					const { courses } = await response.json();
					setCourses(courses);
				} else if (isStudent) {
					const response = await fetch(`/api/enroll/`);
					setEnrolledCourses(await response.json());
				} else {
					const response = await fetch(`/api/courses/`);
					setCourses(await response.json());
				}
			} catch (error) {
				console.error("Error fetching courses:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, [isTeacher]);

	return (
		<div className="container py-8">
			<div className="flex flex-col space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">
						{isTeacher
							? "Tous les cours que vous avez créés"
							: "Mes cours"}
					</h1>
					{/* <CourseFilter onCategoryChange={setSelectedCategory} /> */}
				</div>

				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="h-[300px] rounded-lg bg-muted animate-pulse"
							/>
						))}
					</div>
				) : (
					<>
						{enrolledCourses.length > 0 ? (
							<div className="grid gap-4">
								{enrolledCourses.map((enrollment) => (
									<Card key={enrollment.id}>
										<CardHeader>
											<CardTitle>
												{enrollment.course.title}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="space-y-2">
												<div className="flex items-center justify-between text-sm">
													<span>Progression</span>
													<span className="font-medium">
														{enrollment.progress}%
													</span>
												</div>
												<Progress
													value={enrollment.progress}
												/>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<div className="text-2xl font-bold text-center">
								{isTeacher
									? "Vous n'avez pas encore créé de cours"
									: "Abandonnez vous à un cours"}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
