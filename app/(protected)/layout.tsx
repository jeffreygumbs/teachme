import React from "react";
import Dashboardnav from "@/components/dashboard-nav";

export default function DefaultLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="bg-gray-300 h-full pt-8">
			<Dashboardnav />
			<main>{children}</main>
		</div>
	);
}
