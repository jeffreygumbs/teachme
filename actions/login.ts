"use server";

import { AuthError } from "next-auth";
import { Login, loginSchema } from "../lib/types";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import prisma from "@/lib/prismadb";
import {
	generateVerificationToken,
	generateTwoFactorToken,
} from "@/lib/tokens";
import { getUserByEmail } from "@/lib/user";
import { getTwoFactorTokenByEmail } from "@/lib/two-factor-token";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { getTwoFactorConfirmationByUserId } from "@/lib/two-factor-confirmation";

export const login = async (value: Login) => {
	const validatedFields = loginSchema.safeParse(value);

	if (!validatedFields.success) {
		return { error: "Invalid login credentials" };
	}
	const { username, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(username);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: "User does not exist!" };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email,
		);

		await sendVerificationEmail(
			verificationToken.username,
			verificationToken.token,
		);

		return { success: "Confirmation email sent!" };
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

			if (!twoFactorToken) {
				return { error: "Invalid code!" };
			}

			if (twoFactorToken.token !== code) {
				return { error: "Invalid code!" };
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date();

			if (hasExpired) {
				return { error: "Code expired!" };
			}

			await prisma.twoFactorToken.delete({
				where: { id: twoFactorToken.id },
			});

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id,
			);

			if (existingConfirmation) {
				await prisma.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				});
			}

			await prisma.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorEmail(twoFactorToken.username, twoFactorToken.token);

			return { twoFactor: true };
		}
	}

	try {
		await signIn("credentials", {
			username,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid login credentials" };
				default:
					return { error: "Something went wrong" };
			}
		}
		throw error;
	}
};
