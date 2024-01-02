import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

interface HeaderProps {
	headerLabel: string;
}

export const Header = ({ headerLabel }: HeaderProps) => {
	return (
		<div className="flex flex-col w-full gap-y-4 items-center justify-between">
			<h1 className={cn("text-3xl font-semibold", font.className)}>Teach Me</h1>
			<p className="text-muted-foreground">{headerLabel}</p>
		</div>
	);
};
