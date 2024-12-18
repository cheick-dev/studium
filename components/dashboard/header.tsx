import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { UserNav } from "../user-nav";
import { ModeToggle } from "../toggle-mode";

export function DashboardHeader() {
	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				<Link href="/dashboard" className="flex items-center space-x-2">
					<GraduationCap className="h-6 w-6" />
					<span className="font-bold">E-Learning</span>
				</Link>
				<div className="ml-auto flex items-center space-x-4">
					<ModeToggle />
					<UserNav />
				</div>
			</div>
		</div>
	);
}
