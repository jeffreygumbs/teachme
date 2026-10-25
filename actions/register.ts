"use server";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/lib/user";
import prisma from "../lib/prismadb";
import { type Register, registerSchema } from "../lib/types";

export const register = async (value: Register) => {
	const validatedFields = registerSchema.safeParse(value);
	if (!validatedFields.success) {
		return { error: "Invalid Registration credentials" };
	}
	const { name, username, password } = validatedFields.data;

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
