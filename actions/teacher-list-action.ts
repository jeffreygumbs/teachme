"use server";
import prisma from "@/lib/prismadb";
import { teacherListSchema, TeacherList } from "@/lib/types";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResource {
	context?: {
		alt?: string;
		caption?: string;
	};
	public_id: string;
	secure_url: string;
}

export const addTeacherList = async (data: TeacherList) => {
	const { resources: sneakers } = await cloudinary.api.resources_by_tag(
		"nextjs-server-actions-upload-sneakers",
		{ context: true },
	);
	const result = teacherListSchema.safeParse(data);
	if (result.success) {
		const name = result.data.name;
		const image: File | null = result.data.image as unknown as File;
		const activityScore = result.data.activityScore;
		const studentInteractionRating = result.data.studentInteractionRating;
		const subjectsTaught = result.data.subjectsTaught;

		const arrayBuffer = await image.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);

		const url = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						tags: ["nextjs-server-actions-upload-sneakers"],
					},
					(error, result) => {
						if (error) {
							reject(error);
							return;
						}
						resolve(result);
					},
				)
				.end(buffer);
		});
		console.log(url);
		await prisma.teacherActivity.create({
			data: {
				name,
				// image,
				activity_score: activityScore,
				student_interaction_rating: studentInteractionRating,
				subjects_taught: subjectsTaught,
			},
		});
	}
};
