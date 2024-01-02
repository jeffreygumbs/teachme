"use server";
import { Register, registerSchema } from "../lib/types";
import bcrypt from "bcryptjs";
import prisma from "../lib/prismadb";
import { getUserByEmail } from "@/lib/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (value: Register) => {
	const validatedFields = registerSchema.safeParse(value);
	if (!validatedFields.success) {
		return { error: "Invalid Registration credentials" };
	}
	const { name, username, password, confirmPassword } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(username);

	if (existingUser) {
		return { error: "User already exists" };
	}

	await prisma.user.create({
		data: {
			name,
			email: username,
			password: hashedPassword,
		},
	});

	const verificationToken = await generateVerificationToken(username);

	await sendVerificationEmail(
		verificationToken.username,
		verificationToken.token,
	);

	return { success: "Confirmation email sent!" };
};
