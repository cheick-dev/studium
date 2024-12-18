import * as z from "zod";

export const categorySchema = z.object({
	name: z.string().min(3, { message: "Title must be at least 3 characters" }),
});

export type CourseFormData = z.infer<typeof categorySchema>;
