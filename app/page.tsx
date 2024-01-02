import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Poppins, Secular_One } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

export default function Home() {
	return (
		<main className="flex h-full flex-col sm:flex-row gap-16 px-5 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
			<Image
				className="h-80 w-auto mb-6 "
				src="/banner.png"
				alt="logo/brand"
				width={500}
				height={500}
			/>
			<div className="space-y-6 text-center">
				<h1
					className={cn(
						"text-6xl font-semibold text-white drop-shadow-md",
						font.className,
					)}
				>
					Teach Me
				</h1>
				<p className="text-white text-lg">a simple education dashboard</p>
				<div className="flex justify-center gap-4">
					<LoginButton>
						<Button variant="secondary" size="lg">
							Sign in
						</Button>
					</LoginButton>
					<Button variant="secondary" size="lg">
						<Link href="/register">Sign up</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
