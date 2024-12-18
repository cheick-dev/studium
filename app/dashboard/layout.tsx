"use client";

import { DashboardNav } from "@/components/dashboard/nav";
import { Loader } from "@/components/Loader";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <Loader />;
	}

	if (!session) {
		redirect("/login");
	}

	return (
		<div className="flex min-h-screen flex-col space-y-6">
			{/* <DashboardHeader /> */}
			<div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] mt-4">
				<aside className="hidden w-[200px] flex-col md:flex">
					<DashboardNav />
				</aside>
				<main className="flex w-full flex-1 flex-col overflow-hidden">
					{children}
				</main>
			</div>
		</div>
	);
}
