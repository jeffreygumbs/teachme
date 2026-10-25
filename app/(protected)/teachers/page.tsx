import {
	ArrowUpRight,
	FolderKanban,
	GraduationCap,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const sections = [
	{
		title: "Teachers List",
		description: "Add, view, and manage your teaching staff.",
		href: "/teachers/teacher-list",
		icon: Users,
	},
	{
		title: "Student Progress",
		description: "Track homework, scores, and attendance rates.",
		href: "/teachers/student-progress",
		icon: TrendingUp,
	},
	{
		title: "Resource Management",
		description: "See how resources are allocated across teachers.",
		href: "/resources/resource-management",
		icon: FolderKanban,
	},
	{
		title: "Coach Details",
		description: "Browse coaching staff profiles and expertise.",
		href: "/teachers/coach-details",
		icon: GraduationCap,
	},
];

async function teachers() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
			<PageHeader
				title="Teacher Dashboard"
				description="Everything you need to manage your institution."
			/>
			<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
				{sections.map((section) => (
					<Link key={section.title} href={section.href} className="group">
						<Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
							<CardHeader className="flex-row items-start justify-between space-y-0">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<section.icon className="h-5 w-5" />
								</div>
								<ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
							</CardHeader>
							<CardContent>
								<CardTitle>{section.title}</CardTitle>
								<CardDescription className="mt-1.5">
									{section.description}
								</CardDescription>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}

export default teachers;
