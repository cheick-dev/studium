"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		setIsLoading(true);
		console.log("submit");

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...data, role: "STUDENT" }),
			});

			if (!response.ok) {
				throw new Error("Registration failed");
			}

			toast({
				title: "Success",
				description: "Account created successfully",
			});
			signIn("credentials", {
				email: data.email,
				password: data.password,
			});
			router.push("/dashboard");
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input id="name" disabled={isLoading} {...register("name")} />
				{errors.name && (
					<p className="text-sm text-red-500">
						{errors.name.message}
					</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					disabled={isLoading}
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-sm text-red-500">
						{errors.email.message}
					</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					type="password"
					disabled={isLoading}
					{...register("password")}
				/>
				{errors.password && (
					<p className="text-sm text-red-500">
						{errors.password.message}
					</p>
				)}
			</div>
			{/* <div className="space-y-2">
				<Label htmlFor="role">Role</Label>
				<Select
					onValueChange={(value) =>
						setValue("role", value as "TEACHER" | "STUDENT")
					}
					disabled={isLoading}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a role" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="STUDENT">Student</SelectItem>
						<SelectItem value="TEACHER">Teacher</SelectItem>
					</SelectContent>
				</Select>
				{errors.role && (
					<p className="text-sm text-red-500">
						{errors.role.message}
					</p>
				)}
			</div> */}
			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? "Loading..." : "Create Account"}
			</Button>
		</form>
	);
}
