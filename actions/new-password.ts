import { getPasswordResetToken } from "@/lib/password-rest";
import prisma from "@/lib/prismadb";
import { NewPassword, newPasswordSchema } from "@/lib/types";
import { getUserByEmail } from "@/lib/user";
import bcrypt from "bcryptjs";

export const newPassword = async (
	values: NewPassword,
	token?: string | null,
) => {
	if (!token) return { error: "No token provided" };
	const validatedFields = newPasswordSchema.safeParse(values);
	if (!validatedFields.success) return { error: "Invalid fields" };
	const { password } = validatedFields.data;
	const existingToken = await getPasswordResetToken(token);
	if (!existingToken) return { error: "Invalid token" };
	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) return { error: "Token has expired" };
	const existingUser = await getUserByEmail(existingToken.username);
	if (!existingUser) return { error: "Email does not exist" };
	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			password: hashedPassword,
		},
	});

	await prisma.passwordResetToken.delete({
		where: {
			id: existingToken.id,
		},
	});
	return { success: "Password updated" };
};
