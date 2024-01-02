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
			<div className="flex flex-col sm:flex-row sm:flex-wrap mt-8 mx-4 gap-8 sm:gap-4 justify-center">
				{coachDetails.map((coachDetail) => (
					<Card className="flex flex-row-reverse w-auto  h-68">
						<div className="flex flex-col justify-center">
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
								<Button asChild>
									<Link
										href={`/teachers/coach-details/${coachDetail.coach_id}`}
									>
										Go to
									</Link>
								</Button>
							</CardFooter>
						</div>
						<Image
							src={coachDetail.image}
							alt={coachDetail.name}
							width={150}
							height={60}
							className="ml-auto w-48 h-auto rounded-l-md "
						/>
					</Card>
				))}
			</div>
		</div>
	);
}

export default coachDetails;
