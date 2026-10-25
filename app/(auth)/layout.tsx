import type React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="relative flex min-h-full items-center justify-center overflow-hidden bg-slate-950">
			{/* Ambient background */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute -top-40 left-1/2 h-120 w-192 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl animate-float" />
				<div className="absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-blue-700/25 blur-3xl animate-float-slow" />
				<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
			</div>
			<div className="relative z-10 w-full flex justify-center py-10 animate-in fade-in zoom-in-95 duration-500">
				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
