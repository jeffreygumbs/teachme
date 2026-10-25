"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { Button } from "../ui/button";

export const Social = () => {
	const onClick = (provider: "google" | "github") => {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,
		});
	};
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClick("google")}
			>
				<FcGoogle className="h-5 w-5" />
				Google
			</Button>
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClick("github")}
			>
				<FaGithub className="h-5 w-5" />
				GitHub
			</Button>
		</div>
	);
};
