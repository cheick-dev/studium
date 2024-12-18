"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, Users, BookOpen, Plus } from "lucide-react";
import { useTeacherStats } from "@/hooks/use-teacher-stats";
import { Loader } from "@/components/Loader";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function StudentPage() {
	const { stats, loading, error } = useTeacherStats();

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>Une erreur est survenue: {error.message}</div>;
	}

	// console.log(stats.totalStudents);

	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">
					Tableau de bord
				</h2>
				<div className="flex items-center space-x-2">
					<h2 className="text-3xl font-bold tracking-tight">
						{stats.totalStudents.length}
					</h2>
				</div>
			</div>
			<Table>
				<TableCaption>Liste de vos étudiants.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Etudiants</TableHead>
						{/* <TableHead>Nombres de cours</TableHead> */}
						{/* <TableHead>Montant</TableHead> */}
					</TableRow>
				</TableHeader>
				<TableBody>
					{stats.totalStudents.map((student) => (
						<TableRow key={student.id}>
							<TableCell className="font-medium">
								{student.name}
							</TableCell>
							{/* <TableCell>{student.cours}</TableCell>
							<TableCell>{student.amont}</TableCell> */}
							{/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div>
					<div className="text-2xl font-bold">
						{stats.totalStudents}
					</div>
				</div>
				<p className="text-sm font-medium">Total Étudiants</p>
			</div> */}
		</div>
	);
}
