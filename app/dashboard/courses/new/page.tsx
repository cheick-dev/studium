"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import MDEditor from "@uiw/react-md-editor";
import { CourseFormData } from "@/lib/validations/course";
import { redirect } from "next/navigation";

const NewArticle = () => {
	const { toast } = useToast();
	const form = useForm<CourseFormData>({
		defaultValues: {
			title: "",
			description: "",
			content: "",
		},
	});

	const onSubmit = async (data: CourseFormData) => {
		const response = await fetch(`/api/courses`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				contentType: "application/json",
			},
		});
		const json = await response.json();
		console.log(json);

		toast({
			title: "Success",
			description: "Article créé avec succès !",
			variant: "default",
		});
		redirect("/dashboard/courses");
	};

	return (
		<div className="max-w-4xl mx-auto" data-color-mode="light">
			<h1 className="text-4xl font-bold mb-8">Nouvel Article</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Titre</FormLabel>
								<FormControl>
									<Input
										placeholder="Titre de l'article"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										placeholder="Brève description de l'article"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contenu</FormLabel>
								<FormControl>
									<MDEditor
										value={field.value}
										onChange={(value) =>
											field.onChange(value || "")
										}
										preview="live"
										height={400}
										className="w-full"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-end gap-4">
						<Button
							type="button"
							variant="outline"
							//   onClick={() => navigate("/admin")}
						>
							Annuler
						</Button>
						<Button type="submit">Publier</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default NewArticle;
