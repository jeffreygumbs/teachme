"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { teacherListSchema, TeacherList } from "@/lib/types";
import { addTeacherList } from "@/actions/teacher-list-action";
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
import TeacherListFormButton from "./form-button";
import { useToast } from "@/components/ui/use-toast";
import Dropzone from "react-dropzone";
import { useState } from "react";

export function TeacherListForm() {
	const [image, setImage] = useState();
	const { toast } = useToast();

	const form = useForm<TeacherList>({
		resolver: zodResolver(teacherListSchema),
		defaultValues: {
			name: "",
			activityScore: 0,
			studentInteractionRating: 0,
			subjectsTaught: [],
		},
	});

	const onImage = (data) => {
		setImage(data);
	};

	const clientAction: SubmitHandler<TeacherList> = async (data) => {
		const newTeacherList = {
			name: data.name,
			image: image,
			activityScore: data.activityScore,
			studentInteractionRating: data.studentInteractionRating,
			subjectsTaught: data.subjectsTaught.join(",").split(","),
		};
		const result = teacherListSchema.safeParse(newTeacherList);
		console.log(result);
		if (!result.success) {
			return toast({
				description: result.error.message,
			});
		}
		console.log(result.data);
		await addTeacherList(result.data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(clientAction)}
				className="space-y-8 mt-8"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder="Full Name" {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="activityScore"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Activity Score</FormLabel>
							<FormControl>
								<Input
									placeholder="Activity Score"
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
					control={form.control}
					name="studentInteractionRating"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Student Interaction Rating</FormLabel>
							<FormControl>
								<Input
									placeholder="Student Interaction Rating"
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
					control={form.control}
					name="subjectsTaught"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subjects Taught</FormLabel>
							<FormControl>
								<Input
									placeholder="Subjects Taught"
									{...field}
									onChange={(e) => field.onChange(Array(e.target.value))}
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
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Dropzone onDrop={onImage}>
									{({ getRootProps, getInputProps }) => (
										<section>
											<div {...getRootProps()}>
												<input {...getInputProps()} />
												<p>
													Drag 'n' drop some files here, or click to select
													files
												</p>
											</div>
										</section>
									)}
								</Dropzone>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<TeacherListFormButton />
			</form>
		</Form>
	);
}
