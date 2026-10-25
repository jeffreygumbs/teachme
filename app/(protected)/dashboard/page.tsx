import { PageHeader } from "@/components/page-header";

function page() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
			<PageHeader
				title="Dashboard"
				description="Your institution at a glance."
			/>
			<div className="mt-8 rounded-xl border bg-card p-12 text-center text-muted-foreground shadow-sm">
				Overview widgets are coming soon.
			</div>
		</div>
	);
}

export default page;
