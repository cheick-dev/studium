import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Course } from "@/types/course.type";

export function CourseCard(course: Course) {
	return (
		<Card className="flex flex-col overflow-hidden">
			<CardHeader className="p-0">
				<div className="aspect-video relative">
					<Image
						src={
							course.image ||
							"https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
						}
						alt={course.title}
						fill
						className="object-cover"
					/>
				</div>
			</CardHeader>
			<CardContent className="flex-1 p-4">
				<div className="flex items-center justify-between mb-2">
					<Badge variant="secondary">{course.category?.name}</Badge>
					<span className="font-bold">
						{course.price === 0 ? "Gratuit" : `${course.price}€`}
					</span>
				</div>
				<h3 className="font-semibold text-lg mb-2">{course.title}</h3>
				<p className="text-sm text-muted-foreground line-clamp-2">
					{course.description}
				</p>
				<p className="text-sm text-muted-foreground mt-2">
					Par {course.teacher?.name}
				</p>
			</CardContent>
			<CardFooter className="p-4 pt-0">
				<Button asChild className="w-full">
					<Link href={`/courses/${course.id}`}>Voir le cours</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
