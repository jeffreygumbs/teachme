"use server";
import prisma from "@/lib/prismadb";
import { teacherListSchema, TeacherList } from "@/lib/types";
import { revalidatePath } from "next/cache";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
// 	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
// 	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export const addTeacherList = async (data: TeacherList) => {
	// console.log(data);
	const result = teacherListSchema.safeParse(data);
	if (result.success) {
		try {
			const {
				name,
				// image,
				activityScore,
				studentInteractionRating,
				subjectsTaught,
			} = result.data;
			console.log(result.data);
			await prisma.teacherActivity.create({
				data: {
					name,
					image:
						"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
					activity_score: activityScore,
					student_interaction_rating: studentInteractionRating,
					subjects_taught: subjectsTaught,
				},
			});
			revalidatePath("/teachers/teacher-list");
			return { success: true }; // Return a success response
		} catch (error: any) {
			console.error(error);
			return { success: false, error: error.message }; // Return an error response
		}
	} else {
		return { success: false, error: "Invalid data" }; // Handle validation failure
	}
};
