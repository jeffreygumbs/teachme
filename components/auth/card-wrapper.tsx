"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

export const CardWrapper = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className="mx-5 w-100 border-white/10 bg-white/[0.97] shadow-2xl shadow-sky-950/40 backdrop-blur dark:bg-card/95">
			<CardHeader>
				<Header headerLabel={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter className="flex-col gap-4">
					<div className="flex w-full items-center gap-3">
						<div className="h-px flex-1 bg-border" />
						<span className="text-xs text-muted-foreground">
							Or continue with
						</span>
						<div className="h-px flex-1 bg-border" />
					</div>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton href={backButtonHref} label={backButtonLabel} />
			</CardFooter>
		</Card>
	);
};
