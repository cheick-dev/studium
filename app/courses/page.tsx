"use client";

import { CourseCard } from "@/components/courses/course-card";
import { CourseFilter } from "@/components/courses/course-filter";
import { useEffect, useState } from "react";
import { Course } from "@/types/course.type";

export default function CoursesPage() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState<string>("");

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch("/api/courses/");
				setCourses(await response.json());
			} catch (error) {
				console.error("Error fetching courses:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, [selectedCategory]);

	return (
		<div className="container py-8 mx-auto">
			<div className="flex flex-col space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold">Tous les cours</h1>
					<CourseFilter onCategoryChange={setSelectedCategory} />
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{courses.map((course) => (
							<CourseCard
								key={course.id}
								description=""
								id={course.id}
								image=""
								price={0}
								title={course.title}
								hasPdf={false}
								hasVideo={false}
								category={course?.category}
								teacher={course?.teacher}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
