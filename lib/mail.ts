import { Resend } from "resend";
import { codeBlock, ctaButton, emailLayout } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);
const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

export const sendTwoFactorEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: "Teach Me <noreply@jeffreygumbs.com>",
		to: email,
		subject: `${token} is your Teach Me sign-in code`,
		html: emailLayout({
			preheader: `Your sign-in code is ${token}`,
			heading: "Your sign-in code",
			intro:
				"Enter the code below to finish signing in to your Teach Me account. It expires in 1 hour.",
			body: codeBlock(token),
			footnote:
				"If you didn't try to sign in, you can safely ignore this email — no one can access your account without this code.",
		}),
	});
};

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${siteurl}/new-verification?token=${token}`;
	await resend.emails.send({
		from: "Teach Me <onboarding@jeffreygumbs.com>",
		to: email,
		subject: "Verify your email address",
		html: emailLayout({
			preheader: "Confirm your email to activate your Teach Me account",
			heading: "Welcome aboard",
			intro:
				"Thanks for creating a Teach Me account. Confirm your email address to get started — the link expires in 1 hour.",
			body: ctaButton("Verify email address", confirmLink),
			footnote: `If the button doesn't work, paste this link into your browser: <a href="${confirmLink}" style="color:#7dd3fc;word-break:break-all;">${confirmLink}</a>`,
		}),
	});
};

export const sendPasswordRestEmail = async (email: string, token: string) => {
	const resetLink = `${siteurl}/new-password?token=${token}`;
	await resend.emails.send({
		from: "Teach Me <noreply@jeffreygumbs.com>",
		to: email,
		subject: "Reset your Teach Me password",
		html: emailLayout({
			preheader: "Reset your password — link expires in 1 hour",
			heading: "Reset your password",
			intro:
				"We received a request to reset the password for your Teach Me account. Choose a new password using the button below — the link expires in 1 hour.",
			body: ctaButton("Reset password", resetLink),
			footnote: `If the button doesn't work, paste this link into your browser: <a href="${resetLink}" style="color:#7dd3fc;word-break:break-all;">${resetLink}</a>`,
		}),
	});
};
