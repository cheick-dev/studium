"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { User } from "lucide-react";
import { useCourseStore } from "@/store/course-store";
import { useAuthStore } from "@/store/auth-store";
import UserProfileSidebar from "./dashboard/profile";
import { useState } from "react";

export function UserNav() {
	const { data: session } = useSession();
	const user = session?.user;
	const { setCourses } = useCourseStore();
	const [isOpen, setIsOpen] = useState(false);
	const { setUser } = useAuthStore();
	const handleLogout = () => {
		signOut();
		setCourses([]);
		setUser(null);
	};

	const userProfile = {
		id: session?.user.id,
		name: session?.user.name,
		email: session?.user.email,
		avatarUrl: session?.user?.avatarUrl || "",
		role: session?.user.role,
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="relative h-8 w-8 rounded-full"
					>
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={user?.image || ""}
								alt={user?.name || ""}
							/>
							<AvatarFallback>
								<User className="h-4 w-4" />
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{user?.name}
							</p>
							<p className="text-xs leading-none text-muted-foreground">
								{user?.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<a href="/profile">Profile</a>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<a href="/dashboard">Tableau de bord</a>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<a href="/settings">Paramètres</a>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="cursor-pointer"
						onSelect={handleLogout}
					>
						Se déconnecter
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<UserProfileSidebar
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				userProfile={userProfile}
			/>
		</>
	);
}
