"use ";
import React, { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, PenBoxIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useCourseStore } from "@/store/course-store";

// Type définissant la structure des données de l'utilisateur
interface UserProfile {
	id: string;
	name: string;
	email: string;
	avatarUrl?: string;
	role?: string;
}

// Props du composant
interface UserProfileSidebarProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	userProfile: UserProfile;
}

// Composant de profil utilisateur
export const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({
	isOpen,
	onOpenChange,
	userProfile,
}) => {
	const { setCourses } = useCourseStore();
	const handleLogout = () => {
		signOut();
		setCourses([]);
	};
	return (
		<Sheet open={isOpen} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="w-[300px] sm:w-[400px] overflow-y-auto"
			>
				<SheetHeader className="mb-6">
					<SheetTitle>{userProfile.name}</SheetTitle>
					<SheetDescription>{userProfile.email}</SheetDescription>
				</SheetHeader>

				{/* Section Avatar et Informations Personnelles */}
				<div className="flex flex-col items-center space-y-4 mb-6">
					<Avatar className="h-24 w-24">
						<AvatarImage
							src={userProfile.avatarUrl}
							alt={`Photo de profil de ${userProfile.name}`}
						/>
						<AvatarFallback>
							{userProfile?.name?.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<div className="text-center">
						{userProfile.role && (
							<p className="text-sm text-muted-foreground">
								{userProfile.role}
							</p>
						)}
					</div>
				</div>

				{/* Actions du Profil */}
				<div className="space-y-2">
					<Button variant="ghost" className="w-full justify-start">
						<PenBoxIcon className="mr-2 h-4 w-4" />
						Modifier mes informations
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-start"
						onClick={handleLogout}
						// onSelect={handleLogout}
					>
						<LogOut className="mr-2 h-4 w-4" />
						Se déconnecter
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default UserProfileSidebar;