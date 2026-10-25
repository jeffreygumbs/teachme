import { FolderKanban, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prismadb";

async function page() {
	const resources = await prisma.resourceAllocation.findMany({
		include: {
			TeacherActivity: true,
			ResourceManagement: true,
		},
	});

	const getTeacherName = (teacherId: number) => {
		const foundTeacher = resources
			.map((resource) => resource.TeacherActivity)
			.find((teacher) => teacher.teacher_id === teacherId);

		return foundTeacher ? foundTeacher.name : "Unknown Teacher";
	};

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
			<PageHeader
				title="Resource Management"
				description="How resources are allocated and utilized across teachers."
			/>
			<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{resources.map((resource) => {
					const utilization = Math.max(
						0,
						Math.min(100, resource.ResourceManagement.utilization_rate),
					);
					return (
						<Card key={resource.resource_id}>
							<CardHeader>
								<div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<FolderKanban className="h-5 w-5" />
								</div>
								<CardTitle className="text-base">
									{resource.ResourceManagement.resource_name}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<div className="mb-1.5 flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Utilization</span>
										<span className="font-medium tabular-nums">
											{resource.ResourceManagement.utilization_rate}%
										</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full rounded-full bg-primary"
											style={{ width: `${utilization}%` }}
										/>
									</div>
								</div>
								<div className="space-y-1.5">
									<div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
										<Users className="h-3.5 w-3.5" />
										Allocated teachers
									</div>
									{resource.ResourceManagement.allocated_teachers.map(
										(teacher) => (
											<CardDescription key={teacher}>
												{getTeacherName(teacher)}
											</CardDescription>
										),
									)}
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default page;
