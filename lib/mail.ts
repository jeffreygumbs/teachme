import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

export const sendTwoFactorEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: "noreply@jeffreygumbs.io",
		to: email,
		subject: "@FA Code",
		html: `<h1>Your 2FA code: ${token}</h1>`,
	});
};

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${siteurl}/new-verification?token=${token}`;
	await resend.emails.send({
		from: "onboarding@jeffreygumbs.io",
		to: email,
		subject: "Verify your email",
		html: `<a href="${confirmLink}">Click here to reset your password</a>`,
	});
};

export const sendPasswordRestEmail = async (email: string, token: string) => {
	const resetLink = `${siteurl}/new-password?token=${token}`;
	await resend.emails.send({
		from: "noreply@jeffreygumbs.io",
		to: email,
		subject: "Reset your password",
		html: `<a href=${resetLink}>Click here to reset your password</a>`,
	});
};
