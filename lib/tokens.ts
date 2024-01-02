import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getVerificationTokenByEmail } from "./verificiation-token";
import { getPasswordResetTokenEmail } from "./password-rest";
import { getTwoFactorTokenByEmail } from "./two-factor-token";
import prisma from "./prismadb";

export const generateTwoFactorToken = async (username: string) => {
	const token = crypto.randomInt(100_000, 1_000_000).toString();
	//TODO review token expiration time
	const expires = new Date(new Date().getTime() + 3600 * 1000);
	const existingToken = await getTwoFactorTokenByEmail(username);

	if (existingToken) {
		await prisma.twoFactorToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}
	const twoFactorToken = await prisma.twoFactorToken.create({
		data: {
			token,
			expires,
			username,
		},
	});
	return twoFactorToken;
};

export const generatePasswordResetToken = async (username: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getPasswordResetTokenEmail(username);

	if (existingToken) {
		await prisma.passwordResetToken.delete({
			where: { id: existingToken.id },
		});
	}

	const passwordRestToken = await prisma.passwordResetToken.create({
		data: {
			token,
			expires,
			username,
		},
	});
	return passwordRestToken;
};

export const generateVerificationToken = async (username: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(username);
	if (existingToken) {
		await prisma.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}
	const verficationToken = await prisma.verificationToken.create({
		data: {
			token,
			expires,
			username,
		},
	});
	return verficationToken;
};
