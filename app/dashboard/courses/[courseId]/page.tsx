import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { FileText, Video } from "lucide-react";

export default async function CoursePage({
	params,
}: {
	params: { courseId: string };
}) {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect("/auth/login");
	}

	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
		},
		include: {
			teacher: true,
			comments: {
				include: {
					user: true,
				},
				orderBy: {
					createdAt: "desc",
				},
			},
		},
	});

	if (!course) {
		notFound();
	}

	return (
		<div className="container mx-auto py-10">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-6">{course.title}</h1>
				<div className="rounded-lg shadow-md p-6 mb-6">
					<p className=" mb-4">{course.description}</p>
					<div className="prose max-w-none mb-6">
						{course.content}
					</div>
					<div className="flex gap-4">
						{course.videoUrl && (
							<Button asChild variant="outline">
								<a
									href={course.videoUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Video className="h-4 w-4 mr-2" />
									Watch Video
								</a>
							</Button>
						)}
						{course.pdfUrl && (
							<Button asChild variant="outline">
								<a
									href={course.pdfUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<FileText className="h-4 w-4 mr-2" />
									View PDF
								</a>
							</Button>
						)}
					</div>
				</div>
				<div className="mt-8">
					<h2 className="text-2xl font-bold mb-4">Comments</h2>
					{/* Comments section will be added in the next implementation */}
				</div>
			</div>
		</div>
	);
}
