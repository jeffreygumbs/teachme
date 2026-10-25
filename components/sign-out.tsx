import { LogOut } from "lucide-react";
import type React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

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
			<Button type="submit" variant="ghost" size="sm" className="gap-1.5">
				<LogOut className="h-4 w-4" />
				{children}
			</Button>
		</form>
	);
};
export default SignOutButton;
