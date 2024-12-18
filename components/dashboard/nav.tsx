"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
	BarChart,
	BookOpen,
	GraduationCap,
	Layout,
	Settings,
	Users,
} from "lucide-react";

export function DashboardNav() {
	const pathname = usePathname();
	const { data: session } = useSession();

	const isTeacher = session?.user?.role === "TEACHER";

	const routes = [
		{
			href: "/dashboard",
			label: "Vue d'ensemble",
			icon: Layout,
		},
		{
			href: "/dashboard/courses",
			label: "Mes cours",
			icon: BookOpen,
		},
		...(isTeacher
			? [
					// {
					// 	href: "/dashboard/analytics",
					// 	label: "Statistiques",
					// 	icon: BarChart,
					// },
					{
						href: "/dashboard/students",
						label: "Étudiants",
						icon: Users,
					},
			  ]
			: []),
		// {
		// 	href: "/dashboard/settings",
		// 	label: "Paramètres",
		// 	icon: Settings,
		// },
	];

	return (
		<nav className="flex flex-col space-y-1 h-screen fixed">
			{routes.map((route) => {
				const Icon = route.icon;
				return (
					<Button
						key={route.href}
						variant={
							pathname === route.href ? "secondary" : "ghost"
						}
						className={cn(
							"w-full justify-start",
							pathname === route.href && "bg-muted"
						)}
						asChild
					>
						<Link href={route.href}>
							<Icon className="mr-2 h-4 w-4" />
							{route.label}
						</Link>
					</Button>
				);
			})}
		</nav>
	);
}
