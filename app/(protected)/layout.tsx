import type React from "react";
import Dashboardnav from "@/components/dashboard-nav";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-full flex-col bg-muted/40">
			<Dashboardnav />
			<main className="flex-1">{children}</main>
		</div>
	);
}
