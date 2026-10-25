import { ArrowRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prismadb";

async function coachDetails() {
	const coachDetails = await prisma.coachDetail.findMany();
	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
			<PageHeader
				title="Coach Details"
				description="Profiles of your dedicated coaching staff."
			/>
			<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{coachDetails.map((coachDetail) => (
					<Card
						key={coachDetail.coach_id}
						className="group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md"
					>
						<div className="h-20 bg-linear-to-r from-sky-500 to-blue-700" />
						<CardContent className="-mt-10">
							<Image
								src={coachDetail.image}
								alt={coachDetail.name}
								width={80}
								height={80}
								className="h-20 w-20 rounded-full border-4 border-card object-cover shadow-md"
							/>
							<h3 className="mt-3 font-semibold">{coachDetail.name}</h3>
							<p className="text-sm text-muted-foreground">
								{coachDetail.specialization}
							</p>
							<div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
								<BadgeCheck className="h-3.5 w-3.5 text-primary" />
								{coachDetail.years_of_experience} years of experience
							</div>
							<Button className="mt-4 w-full gap-1.5" variant="outline" asChild>
								<Link href={`/teachers/coach-details/${coachDetail.coach_id}`}>
									View profile
									<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
								</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

export default coachDetails;
