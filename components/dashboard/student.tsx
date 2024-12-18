"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { Loader } from "@/components/Loader";

interface EnrolledCourse {
	id: string;
	course: {
		title: string;
		description: string;
		image: string;
	};
	progress: number;
}

export function StudentDashboard() {
	const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(
		[]
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEnrolledCourses = async () => {
			try {
				const response = await fetch("/api/enroll");
				const data = await response.json();
				setEnrolledCourses(data);
			} catch (error) {
				console.error("Error fetching enrolled courses:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEnrolledCourses();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">
					Tableau de bord
				</h2>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Cours en cours
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{enrolledCourses.length}
						</div>
					</CardContent>
				</Card>
			</div>
			{/* <div className="grid gap-4">
				{enrolledCourses.map((enrollment) => (
					<Card key={enrollment.id}>
						<CardHeader>
							<CardTitle>{enrollment.course.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span>Progression</span>
									<span className="font-medium">
										{enrollment.progress}%
									</span>
								</div>
								<Progress value={enrollment.progress} />
							</div>
						</CardContent>
					</Card>
				))}
			</div> */}
		</div>
	);
}
