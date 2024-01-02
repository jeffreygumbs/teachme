import React from "react";
import Dashboardnav from "@/components/dashboard-nav";

export default function DefaultLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="">
			<Dashboardnav />
			<main>{children}</main>
		</div>
	);
}
