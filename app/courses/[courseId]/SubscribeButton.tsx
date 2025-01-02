"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEnrollmentStore } from "./store";

const SubscribeButton = ({ courseId }: { courseId: string }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const { data: session } = useSession();
	const user = session?.user;

	const { setIsEnrolled, isEnrolled } = useEnrollmentStore();

	const getEnrolled = async function () {
		const response = await fetch(`/api/enroll/${courseId}-${user?.id}`);
		const data = await response.json();
		setIsEnrolled(data);
	};

	const handler = async () => {
		await getEnrolled();
		try {
			if (!user) {
				redirect("/login");
			} else {
				setIsLoading(true);
				const res = await fetch(`/api/enroll`, {
					method: isEnrolled ? "DELETE" : "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						courseId,
					}),
				});
				const data = await res.json();

				setIsEnrolled(data.enrollment);
				setIsLoading(false);
				toast({
					title: "Info",
					description: data.message,
					variant: "default",
				});
			}
		} catch (error) {
			toast({
				title: "Alert !",
				description: "Vous avez déjà éffectué cette action",
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
				<>
					<Button onClick={handler} disabled={isLoading}>
						{isLoading ? (
							<Loader className="mr-2 animate-spin" size={20} />
						) : (
							<>{isEnrolled ? "Se désabonner" : "S'abonner"}</>
						)}
					</Button>
				</>
			)}
		</>
	);
};

export default SubscribeButton;
