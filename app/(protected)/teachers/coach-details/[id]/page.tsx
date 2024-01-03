import React from "react";
import prisma from "@/lib/prismadb";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

async function coachDetailsUser({
	params: { id },
}: { params: { id: string } }) {
	const coachID = parseInt(id);

	const coachTeacherInts = await prisma.coachTeacherInteraction.findMany({
		where: { coach_id: coachID },
		include: {
			coach: true, // Include related coachDetail
			teacher: true, // Include related teacherDetail
		},
	});

	return (
		<div className="mt-8 sm:mx-32">
			<h1 className="flex justify-center sm:justify-start text-xl font-bold">
				Coach Teacher Interactions
			</h1>
			<div className="mt-8 mx-6 flex  flex-col sm:flex-row gap-4">
				<div className="flex flex-col gap-3 text-slate-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-sky-600  items-center my-4 sm:mr-6 w-64 justify-center sm:w-96 h-64 bg-slate-100 rounded-lg shadow-md">
					<Image
						src={coachTeacherInts[0].coach.image}
						alt={coachTeacherInts[0].coach.name}
						width={100}
						height={100}
						className="rounded-full shadow-md h-32 w-32 border-slate-100 border-6xl-solid border"
					/>
					<div className="flex flex-col justify-center">
						<h2 className="font-semibold">
							Name: {coachTeacherInts[0].coach.name}
						</h2>
						<h3 className="text-left">Title: Coach</h3>
					</div>
				</div>
				<div className="flex flex-col sm:flex-row gap-10 sm:gap-4  flex-wrap mt-4 ">
					{coachTeacherInts === null
						? null
						: coachTeacherInts.map((coachTeacherInt) => (
								<div className=" sm:w-1/2 flex items-center">
									<Card
										className="flex sm:mr-4 justify-between pr-6 w-full hover:bg-accent shadow-md"
										key={coachTeacherInt.teacher.name}
									>
										<div className="flex flex-col justify-center">
											<CardHeader>
												<CardTitle>
													Teacher: {coachTeacherInt.teacher.name}
												</CardTitle>
												<CardDescription>
													Coach: {coachTeacherInt.coach.name}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<p>Meeting Notes: {coachTeacherInt.meeting_notes}</p>
											</CardContent>
											{/* <CardFooter></CardFooter> */}
										</div>
										<div className="flex my-4 gap-4 h-68 w-68">
											<Image
												src={coachTeacherInt.teacher.image}
												alt={coachTeacherInt.teacher.name}
												width={160}
												height={30}
												className="rounded-md"
											/>
										</div>
									</Card>
								</div>
						  ))}
				</div>
			</div>
		</div>
	);
}

export default coachDetailsUser;
