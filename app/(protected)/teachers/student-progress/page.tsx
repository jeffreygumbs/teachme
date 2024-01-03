import prisma from "@/lib/prismadb";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { StudentProgressForm } from "@/components/student-progress-form";

async function teachersList() {
	const students = await prisma.studentProgress.findMany();

	return (
		<div className="mt-8 mx-3 sm:mx-32">
			<div className="flex flex-col sm:flex-row justify-between mx-8 my-6 text-lg">
				<h1 className="flex justify-center sm:justify-starttext-xl font-semibold mb-4">
					Student Progress
				</h1>
				<Sheet>
					<SheetTrigger>
						<Button className="rounded-full">Add Student Progress</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Create Student Progress</SheetTitle>
							<SheetDescription>
								Make changes to your profile here. Click save when you're done.
							</SheetDescription>
						</SheetHeader>
						<StudentProgressForm />
					</SheetContent>
				</Sheet>
			</div>
			<Table className="mt-8 bg-slate-50 rounded-lg shadow-md">
				<TableCaption>A list of your Student Progress</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Subject</TableHead>
						<TableHead className="text-center">Home Work Completion</TableHead>
						<TableHead className="text-center">
							Average Score Improvement
						</TableHead>
						<TableHead className="text-right">Attendance Rate</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{students.map((student) => (
						<TableRow
							className="hover:text-slate-100 hover:bg-sky-600"
							key={student.class_id}
						>
							<TableCell>{student.subject}</TableCell>
							<TableCell className="text-center">
								{student.homework_completion_rate}
							</TableCell>
							<TableCell className="text-center">
								{student.average_score_improvement}
							</TableCell>
							<TableCell className="text-right pr-14 ">
								{student.attendance_rate}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default teachersList;
