import { GraduationCap } from "lucide-react";
import Link from "next/link";
import DropdownMenu from "./dropdown-menu";
import SignOutButton from "./sign-out";
import { ThemeToggle } from "./theme-toggle";

function Dashboardnav() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-xl">
			<nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:px-6">
				<Link href="/teachers" className="flex items-center gap-2">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-blue-700 text-white shadow-md shadow-sky-500/25">
						<GraduationCap className="h-5 w-5" />
					</div>
					<span className="hidden text-lg font-semibold sm:inline">
						Teach Me
					</span>
				</Link>
				<div className="ml-2 flex items-center">
					<DropdownMenu />
				</div>
				<div className="ml-auto flex items-center gap-1">
					<ThemeToggle />
					<SignOutButton>Sign out</SignOutButton>
				</div>
			</nav>
		</header>
	);
}

export default Dashboardnav;
