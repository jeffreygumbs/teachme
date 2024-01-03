import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import prisma from "@/lib/prismadb";
import Image from "next/image";

async function coachDetails() {
	const coachDetails = await prisma.coachDetail.findMany();
	return (
		<div className="flex flex-col justify-center mt-8 sm:mx-32 ">
			<h1 className=" flex justify-center sm:justify-start text-xl font-semibold">
				Coach Detail
			</h1>
			<div className="flex text-center flex-col sm:flex-row sm:flex-wrap mt-8 mx-4 gap-8 sm:gap-10 justify-center">
				{coachDetails.map((coachDetail) => (
					<Card className="flex border-none flex-col-reverse w-auto shadow-none  h-68 bg-gray-200">
						<div className="flex flex-col justify-center pt-14 border-slate-100 border-4 bg-sky-400 m-5  rounded-2xl text-slate-100">
							<CardHeader>
								<CardTitle>{coachDetail.name}</CardTitle>
								<CardDescription>
									<span className="font-semibold">Specialization:</span>{" "}
									{coachDetail.specialization}
								</CardDescription>
							</CardHeader>
							<CardContent className="max-w-80">
								<p>years of experience: {coachDetail.years_of_experience}</p>
							</CardContent>
							<CardFooter>
								<Button className="w-full bg-blue-800" asChild>
									<Link
										href={`/teachers/coach-details/${coachDetail.coach_id}`}
									>
										Go to profile
									</Link>
								</Button>
							</CardFooter>
						</div>
						<div className="flex justify-center">
							<Image
								src={coachDetail.image}
								alt={coachDetail.name}
								width={150}
								height={60}
								className="mt-4 -m-24 z-10 h-32 w-32 rounded-full border-slate-100 border-solid border-4"
							/>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}

export default coachDetails;
