import React from "react";
import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";

const SignOutButton = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	session?.user.id;
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<Button type="submit" variant="secondary">
				{children}
			</Button>
		</form>
	);
};
export default SignOutButton;
