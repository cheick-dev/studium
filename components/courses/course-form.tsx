"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface CourseContentFormData {
	markdownContent: string;
}

export const CourseForm = () => {
	const [previewMode, setPreviewMode] = useState(false);
	const { control, handleSubmit, watch } = useForm<CourseContentFormData>({
		defaultValues: {
			markdownContent: "",
		},
	});

	const markdownContent = watch("markdownContent");

	const onSubmit = (data: CourseContentFormData) => {
		// Logique de sauvegarde du contenu
		console.log("Contenu sauvegardé:", data.markdownContent);
		// TODO: Implémenter la sauvegarde réelle (API, base de données)
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
					Éditeur de Contenu de Cours
					<div className="space-x-2">
						<Button
							variant={!previewMode ? "default" : "outline"}
							onClick={() => setPreviewMode(false)}
						>
							Édition
						</Button>
						<Button
							variant={previewMode ? "default" : "outline"}
							onClick={() => setPreviewMode(true)}
						>
							Prévisualisation
						</Button>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{!previewMode ? (
					<form onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name="markdownContent"
							control={control}
							render={({ field }) => (
								<Textarea
									{...field}
									placeholder="Rédigez votre contenu de cours en Markdown..."
									className="min-h-[400px] font-mono"
								/>
							)}
						/>
						<div className="mt-4 flex justify-end space-x-2">
							<Button type="submit" className="mt-2">
								Sauvegarder
							</Button>
						</div>
					</form>
				) : (
					<div className="prose dark:prose-invert max-w-full">
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeHighlight]}
						>
							{markdownContent}
						</ReactMarkdown>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default CourseForm;
