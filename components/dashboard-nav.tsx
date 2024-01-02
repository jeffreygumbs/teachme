import * as React from "react";

import SignOutButton from "./sign-out";
import DropdownMenu from "./dropdown-menu";

function Dashboardnav() {
	return (
		<nav className="mt-8 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 mx-auto w-11/12 sm:w-2/3 px-8 py-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
			<div className="flex flex-col sm:flex-row gap-3 items-center">
				<div className="flex justify-center sm:justify-start text-2xl text-white mb-3 sm:mb-0">
					Dashboard
				</div>
				<div className="flex gap-3 ">
					<div>
						<DropdownMenu />
					</div>
					<div>
						<SignOutButton>Sign out</SignOutButton>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Dashboardnav;
