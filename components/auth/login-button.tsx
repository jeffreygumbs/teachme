"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
}

export const LoginButton = ({
	children,
	mode = "redirect",
	asChild,
}: LoginButtonProps) => {
	const router = useRouter();

	const onClick = () => {
		router.push("/login");
	};
	const onKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			router.push("/login");
		}
	};

	if (mode === "modal") {
		return <span>Todo: Implement Modal</span>;
	}

	return (
		<span onClick={onClick} onKeyDown={onKeyPress} className="cursor-pointer">
			{children}
		</span>
	);
};
