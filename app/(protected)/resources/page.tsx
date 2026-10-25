import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

function page() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
			<PageHeader
				title="Resources"
				description="Allocate and track shared resources."
			/>
			<div className="mt-8 rounded-xl border bg-card p-12 text-center shadow-sm">
				<p className="text-muted-foreground">
					Head to resource management to see allocations.
				</p>
				<Button className="mt-4 gap-1.5" asChild>
					<Link href="/resources/resource-management">
						Go to resource management
						<ArrowRight className="h-4 w-4" />
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default page;
