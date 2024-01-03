"use server";
import prisma from "@/lib/prismadb";
import { teacherListSchema, TeacherList } from "@/lib/types";

export const addTeacherList = async (data: TeacherList) => {
	console.log(data);
	const result = teacherListSchema.safeParse(data);
	console.log(result.success);

	if (result.success) {
		const name = result.data.name;
		const activityScore = result.data.activityScore;
		const studentInteractionRating = result.data.studentInteractionRating;
		const subjectsTaught = result.data.subjectsTaught;
		await prisma.teacherActivity.create({
			data: {
				name,
				// image: imageURL as string, // assuming url is the image URL
				activity_score: activityScore,
				student_interaction_rating: studentInteractionRating,
				subjects_taught: subjectsTaught,
			},
		});
	}
	// }
};
