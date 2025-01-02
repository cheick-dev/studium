import { create } from "zustand";

interface EnrollmentStore {
	isEnrolled: boolean;
	setIsEnrolled: (isEnrolled: boolean) => void;
}

export const useEnrollmentStore = create<EnrollmentStore>((set) => ({
	isEnrolled: false,
	setIsEnrolled: (isEnrolled: boolean) => set({ isEnrolled }),
}));
