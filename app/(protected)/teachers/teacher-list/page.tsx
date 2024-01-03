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
import Image from "next/image";
import { TeacherListForm } from "@/components/teacher-list-form";
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

async function teachersList() {
	const teachers = await prisma.teacherActivity.findMany();

	return (
		<div className=" mt-8 mx-3 sm:mx-32">
			<div className="flex flex-col sm:flex-row sm:justify-between mx-8 my-6 ">
				<h1 className="flex sm:justify-start justify-center text-xl font-semibold mb-4">
					Teacher List
				</h1>
				<Sheet>
					<SheetTrigger>
						<Button>Add Teacher</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Create Teacher</SheetTitle>
							<SheetDescription>
								Make changes to your profile here. Click save when you're done.
							</SheetDescription>
						</SheetHeader>
						<TeacherListForm />
					</SheetContent>
				</Sheet>
			</div>
			<Table className="mt-8 bg-slate-50  rounded-lg shadow-md">
				<TableCaption>A list of your Teachers</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[150px]">Name</TableHead>
						<TableHead>Subject</TableHead>
						<TableHead>Student Interaction</TableHead>
						<TableHead className="text-right">Activity Score</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{teachers.map((teacher) => (
						<TableRow
							className="hover:text-slate-100 hover:bg-sky-600"
							key={teacher.teacher_id}
						>
							<TableCell className="font-medium">
								<div className="sm:flex items-center w-10 gap-4 ">
									<Image
										src={teacher.image}
										width={100}
										height={100}
										alt={teacher.name}
										className="w-10 h-10 rounded-full my-4 mx-2"
									/>
									<h5>{teacher.name}</h5>
								</div>
							</TableCell>

							<TableCell>{teacher.subjects_taught.join(", ")}</TableCell>
							<TableCell>{teacher.student_interaction_rating}</TableCell>
							<TableCell className="text-right">
								{teacher.activity_score}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default teachersList;
