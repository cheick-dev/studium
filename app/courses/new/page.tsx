import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { CourseForm } from "@/components/courses/course-form";

export default async function NewCoursePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session.user.role !== "TEACHER") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <CourseForm />
        </div>
      </div>
    </div>
  );
}