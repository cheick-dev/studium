import { create } from "zustand";
import { Course } from "@/types/course.type";

// interface Course {
// 	id: string;
// 	title: string;
// 	description: string;
// 	content: string;
// 	videoUrl?: string;
// 	pdfUrl?: string;
// 	teacherId: string;
// }

interface CourseStore {
	courses: Course[];
	selectedCourse: Course | null;
	setCourses: (courses: Course[]) => void;
	setSelectedCourse: (course: Course) => void;
	addCourse: (course: Course) => void;
	updateCourse: (course: Course) => void;
	deleteCourse: (id: string) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
	courses: [],
	selectedCourse: null,
	setCourses: (courses) => set({ courses }),
	setSelectedCourse: (course) => set({ selectedCourse: course }),
	addCourse: (course) =>
		set((state) => ({ courses: [...state.courses, course] })),
	updateCourse: (course) =>
		set((state) => ({
			courses: state.courses.map((c) =>
				c.id === course.id ? course : c
			),
		})),
	deleteCourse: (id) =>
		set((state) => ({
			courses: state.courses.filter((c) => c.id !== id),
		})),
}));
