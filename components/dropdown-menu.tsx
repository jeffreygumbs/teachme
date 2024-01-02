"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Teachers List",
		href: "/teachers/teacher-list",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Resource Management",
		href: "/resources/resource-management",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Coach Details",
		href: "/teachers/coach-details",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	// {
	// 	title: "Coach Teacher Interactions",
	// 	href: "/docs/primitives/scroll-area",
	// 	description: "Visually or semantically separates content.",
	// },
	{
		title: "Student Progress",
		href: "/teachers/student-progress",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
];

const DropdownMenu = () => {
	return (
		<>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Teachers</NavigationMenuTrigger>
						<NavigationMenuContent className="">
							<ul className="grid w-[400px] gap-3 p-4 md:-w[500px] md:grid-cols-2 lg:w-[600px] ">
								{components.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

export default DropdownMenu;
