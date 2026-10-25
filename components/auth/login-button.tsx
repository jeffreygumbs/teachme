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
		// biome-ignore lint/a11y/useSemanticElements: children render the interactive element
		<span
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={onKeyPress}
			className="cursor-pointer"
		>
			{children}
		</span>
	);
};
