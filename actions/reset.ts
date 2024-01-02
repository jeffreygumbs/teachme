"use server";
import { Reset, resetSchema } from "@/lib/types";
import { getUserByEmail } from "@/lib/user";
import { sendPasswordRestEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (value: Reset) => {
	const validatedFields = resetSchema.safeParse(value);

	if (!validatedFields.success) {
		return { error: "Invalid reset credentials" };
	}

	const { username } = validatedFields.data;
	const existingUser = await getUserByEmail(username);

	if (!existingUser) {
		return { error: "User not found!" };
	}
	const passwordRestToken = await generatePasswordResetToken(username);
	await sendPasswordRestEmail(
		passwordRestToken.username,
		passwordRestToken.token,
	);

	return { success: "Password reset email sent!" };
};
