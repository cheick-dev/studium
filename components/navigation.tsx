"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import { GraduationCap, Search } from "lucide-react";
import { ModeToggle } from "./toggle-mode";
import UserProfileSidebar from "./dashboard/profile";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function Navigation() {
	const { data: session } = useSession();
	const user = session?.user;
	const [isOpen, setIsOpen] = useState(false);
	const userProfile = {
		id: session?.user.id,
		name: session?.user.name,
		email: session?.user.email,
		avatarUrl: session?.user?.avatarUrl || "",
		role: session?.user.role,
	};

	return (
		<>
			<header className="sticky top-0 z-50 w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-14 items-center justify-between w-full mx-auto px-4 md:px-8">
					{/* Logo et navigation gauche */}
					<div className="flex items-center space-x-6">
						<Link
							href={session?.user ? "/dashboard" : "/"}
							className="flex items-center space-x-2"
						>
							<span className="font-bold flex">
								<GraduationCap className="h-6 w-6 mr-2" />
								Studium
							</span>
						</Link>
					</div>

					{/* Menu de navigation centré */}
					<div className="flex-1 justify-center space-x-6 text-sm font-medium hidden md:flex">
						{!session?.user || session?.user?.role !== "TEACHER" ? (
							<Link
								href="/courses"
								className="transition-colors hover:text-foreground/80"
							>
								Voir les cours
							</Link>
						) : (
							""
						)}
					</div>

					{/* Icones et actions à droite */}
					<div className="flex items-center space-x-4">
						{/* Search button */}
						{/* <Button variant="ghost" className="w-9 px-0">
						<Search className="h-4 w-4" />
						<span className="sr-only">Search</span>
					</Button> */}

						{/* Mode Toggle */}
						<ModeToggle />

						{/* User Navigation or Login button */}
						{session?.user ? (
							// <UserNav />
							<Button
								variant="ghost"
								className="relative h-8 w-8 rounded-full"
								onClick={() => setIsOpen(!isOpen)}
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
						) : (
							<Button
								asChild
								variant="secondary"
								className="ml-4"
							>
								<Link href="/auth/login">Se connecter</Link>
							</Button>
						)}
					</div>
				</div>
			</header>
			<UserProfileSidebar
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				userProfile={userProfile}
			/>
		</>
	);
}
