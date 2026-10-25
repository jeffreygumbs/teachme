import prisma from "../lib/prismadb";

export const getUserByEmail = async (email: string) => {
	return prisma.user.findUnique({
		where: {
			email: email,
		},
	});
};
export const getUserById = async (id: string) => {
	return prisma.user.findUnique({
		where: {
			id,
		},
	});
};
