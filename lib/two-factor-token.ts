import prisma from "./prismadb";

export const getTwoFactorTokenByToken = async (token: string) => {
	try {
		const twoFactorToken = await prisma.twoFactorToken.findUnique({
			where: {
				token,
			},
		});
		return twoFactorToken;
	} catch {
		return null;
	}
};
export const getTwoFactorTokenByEmail = async (username: string) => {
	try {
		const twoFactorToken = await prisma.twoFactorToken.findFirst({
			where: {
				username,
			},
		});
		return twoFactorToken;
	} catch {
		return null;
	}
};
