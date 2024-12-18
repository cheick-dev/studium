import * as z from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  videoUrl: z.string().url().optional().or(z.literal("")),
  pdfUrl: z.string().url().optional().or(z.literal("")),
});

export type CourseFormData = z.infer<typeof courseSchema>;