"use client";
import { GraduationCap } from "lucide-react";
import React from "react";

export const Loader = () => {
	return (
		<div className="flex items-center justify-center h-screen ">
			<GraduationCap className="h-20 w-20 mr-2 animate-bounce" />
		</div>
	);
};
