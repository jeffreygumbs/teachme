import {
	ArrowRight,
	GraduationCap,
	Sparkles,
	TrendingUp,
	Users,
} from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

const features = [
	{
		icon: Users,
		title: "Teacher management",
		description: "Track activity, subjects, and engagement in one place.",
	},
	{
		icon: TrendingUp,
		title: "Student progress",
		description: "Monitor score improvement, homework, and attendance.",
	},
	{
		icon: Sparkles,
		title: "Smart resources",
		description: "Allocate resources and see utilization at a glance.",
	},
];

export default function Home() {
	return (
		<main className="relative flex min-h-full flex-col overflow-hidden bg-slate-950">
			{/* Ambient background */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute -top-40 left-1/2 h-136 w-216 -translate-x-1/2 rounded-full bg-sky-500/25 blur-3xl animate-float" />
				<div className="absolute -bottom-48 -left-32 h-112 w-md rounded-full bg-blue-700/25 blur-3xl animate-float-slow" />
				<div className="absolute -bottom-40 -right-24 h-104 w-104 rounded-full bg-indigo-600/20 blur-3xl animate-float" />
				<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
			</div>

			{/* Top bar */}
			<header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
				<div className="flex items-center gap-2 text-white">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-blue-700 shadow-lg shadow-sky-500/30">
						<GraduationCap className="h-5 w-5" />
					</div>
					<span className={cn("text-lg", font.className)}>Teach Me</span>
				</div>
				<Button
					variant="ghost"
					className="text-slate-300 hover:bg-white/10 hover:text-white"
					asChild
				>
					<Link href="/login">Sign in</Link>
				</Button>
			</header>

			{/* Hero */}
			<section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
				<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-sky-200 backdrop-blur animate-in fade-in slide-in-from-bottom-4 duration-700">
					<Sparkles className="h-4 w-4" />
					<span>A simple education dashboard</span>
				</div>

				<h1
					className={cn(
						"max-w-3xl text-5xl sm:text-7xl font-semibold tracking-tight text-white animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100",
						font.className,
					)}
				>
					Run your classroom{" "}
					<span className="bg-linear-to-r from-sky-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
						like a pro
					</span>
				</h1>

				<p className="mt-6 max-w-xl text-lg text-slate-400 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
					Teachers, students, resources, and coaching — everything you need to
					manage your education workflow in one beautiful dashboard.
				</p>

				<div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
					<Button
						size="lg"
						className="h-12 rounded-full bg-white px-8 text-slate-950 shadow-xl shadow-sky-500/20 hover:bg-sky-100"
						asChild
					>
						<Link href="/login">
							Get started
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="h-12 rounded-full border-white/20 bg-white/5 px-8 text-white backdrop-blur hover:bg-white/10 hover:text-white"
						asChild
					>
						<Link href="/register">Create an account</Link>
					</Button>
				</div>

				{/* Feature cards */}
				<div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur transition-colors hover:border-sky-400/40 hover:bg-white/10"
						>
							<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-400/20 to-blue-600/20 text-sky-300 ring-1 ring-white/10">
								<feature.icon className="h-5 w-5" />
							</div>
							<h3 className="font-semibold text-white">{feature.title}</h3>
							<p className="mt-1 text-sm text-slate-400">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</section>

			<footer className="relative z-10 pb-8 text-center text-xs text-slate-500">
				Built with Next.js
			</footer>
		</main>
	);
}
