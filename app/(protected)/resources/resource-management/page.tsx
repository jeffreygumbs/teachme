import React from "react";
import prisma from "@/lib/prismadb";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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
		<div className="mt-8 mx-2 sm:mx-32">
			<h1 className="flex justify-center sm:justify-start text-xl font-semibold mb-8">
				Resource Management
			</h1>
			<div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 sm:gap-4">
				{resources.map((resource) => (
					<Card key={resource.resource_id}>
						<CardHeader>
							<CardTitle>{resource.ResourceManagement.resource_name}</CardTitle>
							{resource.ResourceManagement.allocated_teachers.map((teacher) => (
								<CardDescription className="w-full">
									Teacher: {getTeacherName(teacher)}
								</CardDescription>
							))}
						</CardHeader>
						<CardContent>
							<p>
								Utilization Rate: {resource.ResourceManagement.utilization_rate}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

export default page;
