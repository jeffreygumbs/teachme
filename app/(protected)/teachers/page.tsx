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

const cardInfo = [
	{
		title: "Teachers List",
		description: "view of Teachers List",
		content:
			"This is a list of Teachers that you can add, edit, delete, and view.",
		url: "/teachers/teacher-list",
		footer: "Footer",
	},
	{
		title: "Student Progress",
		description: "view of Teachers List",
		content:
			"This is a list of Teachers that you can add, edit, delete, and view.",
		url: "/teachers/student-progress",
		footer: "Footer",
	},
	{
		title: "Resource Management",
		description: "view of Resource Management",
		content:
			"This is a list of Teachers that you can add, edit, delete, and view.",
		url: "/resources/resource-management",
		footer: "Footer",
	},
	{
		title: "Coach Details",
		description: "view of Coach Details",
		content:
			"This is a list of Teachers that you can add, edit, delete, and view.",
		url: "/teachers/coach-details",
		footer: "Footer",
	},
	{
		title: "Coach Teacher Interactions",
		description: "view of Coach Details",
		content:
			"This is a list of Teachers that you can add, edit, delete, and view.",
		footer: "Footer",
	},
];

async function teachers() {
	return (
		<div className="mt-8 mx-8 sm:mx-32 ">
			<h1 className="flex justify-center sm:justify-start my-4 text-xl font-semibold">
				Teacher Dashboard
			</h1>
			<div className="flex flex-col sm:flex-row sm: flex-wrap mt-8 mb-8 gap-8 sm:gap-4 justify-center bg-slate-500 p-10 rounded-lg">
				{cardInfo.map((card) => (
					<Card className="w-62">
						<CardHeader>
							<CardTitle>{card.title}</CardTitle>
							<CardDescription>{card.description}</CardDescription>
						</CardHeader>
						<CardContent className="max-w-80">
							<p>{card.content}</p>
						</CardContent>
						<CardFooter>
							<Button asChild>
								<Link href={`${card.url}`}>Go to</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}

export default teachers;
