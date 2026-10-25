import { PageHeader } from "@/components/page-header";

function students() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
			<PageHeader
				title="Students"
				description="Student records and enrollment."
			/>
			<div className="mt-8 rounded-xl border bg-card p-12 text-center text-muted-foreground shadow-sm">
				Student management is coming soon.
			</div>
		</div>
	);
}

export default students;
