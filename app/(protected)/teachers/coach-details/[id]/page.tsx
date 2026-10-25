import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prismadb";

async function coachDetailsUser({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const coachID = parseInt(id, 10);

	const coachTeacherInts = await prisma.coachTeacherInteraction.findMany({
		where: { coach_id: coachID },
		include: {
			coach: true, // Include related coachDetail
			teacher: true, // Include related teacherDetail
		},
	});

	const coach = coachTeacherInts[0]?.coach;

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
			<PageHeader
				title="Coach Teacher Interactions"
				description={
					coach
						? `Recent meetings between ${coach.name} and teaching staff.`
						: "Recent meetings between coaches and teaching staff."
				}
			/>
			{coach ? (
				<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{coachTeacherInts.map((coachTeacherInt) => (
						<Card
							key={coachTeacherInt.id}
							className="transition-all hover:-translate-y-0.5 hover:shadow-md"
						>
							<CardHeader className="flex-row items-center gap-3 space-y-0">
								<Image
									src={coachTeacherInt.teacher.image}
									alt={coachTeacherInt.teacher.name}
									width={48}
									height={48}
									className="h-12 w-12 rounded-full border object-cover"
								/>
								<div>
									<CardTitle className="text-base">
										{coachTeacherInt.teacher.name}
									</CardTitle>
									<CardDescription>
										Coach: {coachTeacherInt.coach.name}
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex items-start gap-2 rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
									<MessageSquare className="mt-0.5 h-4 w-4 shrink-0" />
									<p>{coachTeacherInt.meeting_notes}</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className="mt-8 rounded-xl border bg-card p-12 text-center text-muted-foreground shadow-sm">
					No interactions found for this coach.
				</div>
			)}
		</div>
	);
}

export default coachDetailsUser;
