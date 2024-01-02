"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { studentProgressSchema, StudentProgress } from "@/lib/types";
import { addStudentProgress } from "@/actions/student-progress-action";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import StudentFormButton from "./form-button";
import { useToast } from "@/components/ui/use-toast";

export function StudentProgressForm() {
	const { toast } = useToast();
	const form = useForm<StudentProgress>({
		resolver: zodResolver(studentProgressSchema),
	});

	const clientAction: SubmitHandler<StudentProgress> = async (data) => {
		const newStudentProgress = {
			subject: data.subject,
			homeWork: data.homeWork,
			averageScore: data.averageScore,
			attendanceRate: data.attendanceRate,
		};

		const result = studentProgressSchema.safeParse(newStudentProgress);

		if (!result.success) {
			return toast({
				description: result.error.message,
			});
		}
		console.log(result.data);
		await addStudentProgress(result.data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(clientAction)}
				className="space-y-8 mt-8"
			>
				<FormField
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<FormControl>
								<Input placeholder="Subject" type="text" {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="homeWork"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Home Work Completion</FormLabel>
							<FormControl>
								<Input
									placeholder="Home Work Completion"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="averageScore"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Average Score Improvement</FormLabel>
							<FormControl>
								<Input
									placeholder="Average Score Improvement"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="attendanceRate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attendance Rate</FormLabel>
							<FormControl>
								<Input
									placeholder="Attendance Rate"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<StudentFormButton />
			</form>
		</Form>
	);
}
