"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";

const CoursePreview = ({ data }: { data: string }) => {
	return (
		<MarkdownPreview
			source={data}
			style={{ padding: 25, borderRadius: 10 }}
			className="prose max-w-none mb-6"
		/>
	);
};

export default CoursePreview;
