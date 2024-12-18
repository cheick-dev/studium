"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface MarkdownEditorProps {
	onSave: (content: string) => void; // Fonction pour enregistrer le contenu
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onSave }) => {
	const [content, setContent] = useState<string>("");

	const handleSave = () => {
		if (content.trim() === "") {
			alert("Le contenu ne peut pas être vide.");
			return;
		}
		onSave(content);
	};

	return (
		<div className="w-full max-w-4xl mx-auto p-4 border rounded-md bg-white dark:bg-gray-900 shadow-sm">
			<Tabs defaultValue="edit">
				<TabsList className="mb-4">
					<TabsTrigger value="edit">Éditeur</TabsTrigger>
					<TabsTrigger value="preview">Aperçu</TabsTrigger>
				</TabsList>

				{/* Onglet Éditeur */}
				<TabsContent value="edit">
					<Textarea
						placeholder="Écris ton contenu en Markdown ici..."
						className="h-64 resize-none focus:ring-2 focus:ring-blue-500 dark:text-white"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</TabsContent>

				{/* Onglet Aperçu */}
				<TabsContent value="preview">
					<div className="prose dark:prose-invert max-w-none">
						<ReactMarkdown>{content}</ReactMarkdown>
					</div>
				</TabsContent>
			</Tabs>

			<Button className="mt-4 w-full" onClick={handleSave}>
				Enregistrer
			</Button>
		</div>
	);
};

export default MarkdownEditor;
