"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SubscribeButton = ({ courseId }: { courseId: string }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isEnrolled, setIsEnrolled] = useState(false);
	const { toast } = useToast();
	const { data: session } = useSession();
	const user = session?.user;

	const handleSubscribe = async () => {
		await getEnrolled();
		try {
			if (!user) {
				redirect("/login");
			} else {
				setIsLoading(true);
				const res = await fetch("/api/enroll", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						courseId,
					}),
				});

				setIsEnrolled(true);
				setIsLoading(false);
				toast({
					title: "Info",
					description: "Vous vous ête abonné ce cours",
					variant: "default",
				});
			}
		} catch (error) {
			toast({
				title: "Alert !",
				description: "Vous vous ête déjà abonné ce cours",
				variant: "destructive",
			});
			setIsLoading(false);
		}
	};
	const getEnrolled = async function () {
		const response = await fetch(`/api/enroll/${courseId}-${user?.id}`);
		const data = await response.json();
		setIsEnrolled(data);
	};
	const handleUnSubscribe = async () => {
		await getEnrolled();
		try {
			setIsLoading(true);
			await fetch(`/api/enroll`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					courseId,
				}),
			});
			setIsLoading(false);
			setIsEnrolled(false);
			toast({
				title: "Info",
				description: "Vous vous êtes désabonné ce cours",
				variant: "default",
			});
		} catch (error) {
			toast({
				title: "Alert !",
				description: "Vous vous êtes déjà désabonné ce cours",
				variant: "destructive",
			});
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getEnrolled();
	}, []);
	return (
		<>
			{user && (
				<Button
					onClick={isEnrolled ? handleUnSubscribe : handleSubscribe}
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader className="mr-2 animate-spin" size={20} />
					) : isEnrolled ? (
						"Se désabonner"
					) : (
						"S'abonner"
					)}
				</Button>
			)}
		</>
	);
};

export default SubscribeButton;
