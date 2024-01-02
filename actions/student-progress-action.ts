"use server";
import prisma from "@/lib/prismadb";
import { studentProgressSchema, StudentProgress } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const addStudentProgress = async (data: StudentProgress) => {
	const result = studentProgressSchema.safeParse(data);
	if (result.success) {
		try {
			await prisma.studentProgress.create({
				data: {
					subject: result.data.subject,
					homework_completion_rate: +result.data.homeWork,
					average_score_improvement: +result.data.averageScore,
					attendance_rate: +result.data.attendanceRate,
				},
			});
			revalidatePath("/teachers/student-progress");
		} catch (e) {
			return e;
		}
	}
};
