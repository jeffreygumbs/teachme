import { Plus } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { TeacherListForm } from "@/components/teacher-list-form";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prismadb";

async function teachersList() {
	const teachers = await prisma.teacherActivity.findMany();

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
			<PageHeader
				title="Teacher List"
				description={`${teachers.length} teacher${teachers.length === 1 ? "" : "s"} on staff`}
				action={
					<Sheet>
						<SheetTrigger asChild>
							<Button className="gap-1.5">
								<Plus className="h-4 w-4" />
								Add Teacher
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Create Teacher</SheetTitle>
								<SheetDescription>
									Make changes to your profile here. Click save when you're
									done.
								</SheetDescription>
							</SheetHeader>
							<TeacherListForm />
						</SheetContent>
					</Sheet>
				}
			/>
			<div className="mt-8 rounded-xl border bg-card shadow-sm">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-55">Name</TableHead>
							<TableHead>Subjects</TableHead>
							<TableHead className="text-center">Interaction</TableHead>
							<TableHead className="text-right">Activity Score</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{teachers.map((teacher) => (
							<TableRow key={teacher.teacher_id}>
								<TableCell>
									<div className="flex items-center gap-3">
										<Image
											src={teacher.image}
											width={40}
											height={40}
											alt={teacher.name}
											className="h-10 w-10 rounded-full border object-cover"
										/>
										<span className="font-medium">{teacher.name}</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex flex-wrap gap-1.5">
										{teacher.subjects_taught.map((subject) => (
											<span
												key={subject}
												className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
											>
												{subject}
											</span>
										))}
									</div>
								</TableCell>
								<TableCell className="text-center">
									{teacher.student_interaction_rating}
								</TableCell>
								<TableCell className="text-right font-medium tabular-nums">
									{teacher.activity_score}
								</TableCell>
							</TableRow>
						))}
						{teachers.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={4}
									className="h-24 text-center text-muted-foreground"
								>
									No teachers yet. Add your first teacher to get started.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default teachersList;
