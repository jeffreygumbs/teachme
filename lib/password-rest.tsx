import prisma from "@/lib/prismadb";

export const getPasswordResetToken = async (token: string) => {
	try {
		const passwordResetToken = await prisma.passwordResetToken.findUnique({
			where: { token },
		});
		return passwordResetToken;
	} catch {
		return null;
	}
};

export const getPasswordResetTokenEmail = async (username: string) => {
	try {
		const passwordResetEmail = await prisma.passwordResetToken.findFirst({
			where: { username },
		});
		return passwordResetEmail;
	} catch {
		return null;
	}
};
