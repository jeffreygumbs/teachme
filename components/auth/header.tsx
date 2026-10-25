import { GraduationCap } from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

interface HeaderProps {
	headerLabel: string;
}

export const Header = ({ headerLabel }: HeaderProps) => {
	return (
		<div className="flex w-full flex-col items-center gap-y-3">
			<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-blue-700 text-white shadow-lg shadow-sky-500/30">
				<GraduationCap className="h-6 w-6" />
			</div>
			<h1 className={cn("text-3xl font-semibold", font.className)}>Teach Me</h1>
			<p className="text-sm text-muted-foreground">{headerLabel}</p>
		</div>
	);
};
