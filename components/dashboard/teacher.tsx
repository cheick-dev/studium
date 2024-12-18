"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, Users, BookOpen, Plus } from "lucide-react";
import { useTeacherStats } from "@/hooks/use-teacher-stats";
import { Loader } from "@/components/Loader";

export function TeacherDashboard() {
	const { stats, loading, error } = useTeacherStats();

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>Une erreur est survenue: {error.message}</div>;
	}

	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">
					Tableau de bord
				</h2>
				<div className="flex items-center space-x-2">
					<Button asChild>
						<Link href="/dashboard/courses/new">
							<Plus className="mr-2 h-4 w-4" />
							Nouveau cours
						</Link>
					</Button>
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Étudiants
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.totalStudents.length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Cours Publiés
						</CardTitle>
						<BookOpen className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.totalCourses}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Revenus Totaux
						</CardTitle>
						<BarChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.totalRevenue.toLocaleString("fr-FR", {
								style: "currency",
								currency: "EUR",
							})}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
