"use client";

import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Category {
	id: string;
	name: string;
}

interface CourseFilterProps {
	onCategoryChange: (categoryId: string) => void;
}

export function CourseFilter({ onCategoryChange }: CourseFilterProps) {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("/api/courses/categories");
				const data = await response.json();
				setCategories(data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	return (
		<Select onValueChange={onCategoryChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Toutes les catégories" />
			</SelectTrigger>
			<SelectContent>
				{categories.map((category) => (
					<SelectItem key={category.id} value={category.id}>
						{category.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
