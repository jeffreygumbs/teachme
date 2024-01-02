import prisma from "./prismadb";

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await prisma.verificationToken.findUnique({
			where: { token },
		});
		return verificationToken;
	} catch {
		return null;
	}
};

export const getVerificationTokenByEmail = async (username: string) => {
	try {
		const verificationEmail = await prisma.verificationToken.findFirst({
			where: { username },
		});
		return verificationEmail;
	} catch {
		return null;
	}
};
