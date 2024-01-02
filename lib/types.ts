import * as z from "zod";

export const studentProgressSchema = z.object({
	subject: z.string().min(2, {
		message: "Subject must be at least 2 characters.",
	}),
	homeWork: z.number().min(1, {
		message: "Home work completion rate must be at least 1.",
	}),
	averageScore: z.number().min(1, {
		message: "Average score improvement must be at least 1.",
	}),
	attendanceRate: z.number().min(1, {
		message: "Attendance rate must be at least 1.",
	}),
});

export type StudentProgress = z.infer<typeof studentProgressSchema>;

export const teacherListSchema = z.object({
	name: z.string().min(5, {
		message: "Name must be at least 5 characters.",
	}),
	image: z.array(z.unknown()).optional(),
	activityScore: z.number().min(1, {
		message: "Average score improvement must be at least 1.",
	}),
	studentInteractionRating: z.number().min(1, {
		message: "Attendance rate must be at least 1.",
	}),
	subjectsTaught: z.array(
		z.string().min(1, {
			message: "Attendance rate must be at least 1.",
		}),
	),
});

export type TeacherList = z.infer<typeof teacherListSchema>;

export const loginSchema = z.object({
	username: z.string().email({
		message: "Email is required.",
	}),
	password: z.string().min(1, {
		message: "Password is required.",
	}),
	code: z.optional(z.string().min(1, { message: "Code is required." })),
});

export type Login = z.infer<typeof loginSchema>;

export const resetSchema = z.object({
	username: z.string().email({
		message: "Email is required.",
	}),
});

export type Reset = z.infer<typeof resetSchema>;

export const newPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Minimum of 8 characters required.",
	}),
});

export type NewPassword = z.infer<typeof newPasswordSchema>;

export const registerSchema = z
	.object({
		name: z.string().min(1, {
			message: "Name is required.",
		}),
		username: z.string().email({
			message: "Email is required.",
		}),
		password: z.string().min(8, {
			message: "Password must be at least 8 characters.",
		}),
		confirmPassword: z.string().min(1, {
			message: "Password Confirmation is required.",
		}),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: "Passwords do not match.",
			path: ["confirmPassword"],
		},
	);

export type Register = z.infer<typeof registerSchema>;
