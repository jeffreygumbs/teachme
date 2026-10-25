import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StudentProgressForm } from "@/components/student-progress-form";
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

function Metric({ value }: { value: number }) {
	const pct = Math.max(0, Math.min(100, value));
	return (
		<div className="flex items-center justify-end gap-3">
			<span className="font-medium tabular-nums">{value}%</span>
			<div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
				<div
					className="h-full rounded-full bg-primary"
					style={{ width: `${pct}%` }}
				/>
			</div>
		</div>
	);
}

async function teachersList() {
	const students = await prisma.studentProgress.findMany();

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
			<PageHeader
				title="Student Progress"
				description="Homework completion, score improvement, and attendance by subject."
				action={
					<Sheet>
						<SheetTrigger asChild>
							<Button className="gap-1.5">
								<Plus className="h-4 w-4" />
								Add Progress
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Create Student Progress</SheetTitle>
								<SheetDescription>
									Make changes to your profile here. Click save when you're
									done.
								</SheetDescription>
							</SheetHeader>
							<StudentProgressForm />
						</SheetContent>
					</Sheet>
				}
			/>
			<div className="mt-8 rounded-xl border bg-card shadow-sm">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead>Subject</TableHead>
							<TableHead className="text-right">Homework</TableHead>
							<TableHead className="text-right">Score Improvement</TableHead>
							<TableHead className="text-right">Attendance</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{students.map((student) => (
							<TableRow key={student.class_id}>
								<TableCell className="font-medium">{student.subject}</TableCell>
								<TableCell>
									<Metric value={student.homework_completion_rate} />
								</TableCell>
								<TableCell>
									<Metric value={student.average_score_improvement} />
								</TableCell>
								<TableCell>
									<Metric value={student.attendance_rate} />
								</TableCell>
							</TableRow>
						))}
						{students.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={4}
									className="h-24 text-center text-muted-foreground"
								>
									No progress data yet. Add a record to get started.
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
