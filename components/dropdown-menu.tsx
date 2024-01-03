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
			"Discover the dedicated educators who make our institution exceptional.",
	},
	{
		title: "Resource Management",
		href: "/resources/resource-management",
		description:
			"Navigate through our comprehensive resource management tools and information.",
	},
	{
		title: "Coach Details",
		href: "/teachers/coach-details",
		description:
			"Discover the profiles of our dedicated and experienced coaching staff",
	},
	// {
	// 	title: "Coach Teacher Interactions",
	// 	href: "/docs/primitives/scroll-area",
	// 	description: "Visually or semantically separates content.",
	// },
	{
		title: "Student Progress",
		href: "/teachers/student-progress",
		description: "Click here to monitor the academic growth of our students.",
	},
];

const DropdownMenu = () => {
	return (
		<>
			<NavigationMenu className="z-20">
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
