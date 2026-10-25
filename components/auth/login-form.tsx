"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/actions/login";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { type Login, loginSchema } from "@/lib/types";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider"
			: "";
	const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (values: Login) => {
		setError("");
		setSuccess("");

		startTransition(() =>
			login(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}
					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError("Something went wrong")),
		);
	};

	return (
		<CardWrapper
			headerLabel="Welcome to the Login Page"
			backButtonLabel="Don't have an account?"
			backButtonHref="/register"
			showSocial
		>
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						{showTwoFactor && (
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>2FA Code</FormLabel>
										<FormControl {...field}>
											<Input
												{...field}
												placeholder="123456"
												disabled={isPending}
											/>
										</FormControl>
										<Button
											size="sm"
											variant="link"
											asChild
											className="px-0 font-normal"
										>
											<Link href="/reset">Forgot password?</Link>
										</Button>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl {...field}>
												<Input
													{...field}
													type="email"
													placeholder="john.doe@example.com"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl {...field}>
												<Input
													{...field}
													type="password"
													placeholder="********"
													disabled={isPending}
												/>
											</FormControl>
											<Button
												size="sm"
												variant="link"
												asChild
												className="px-0 font-normal"
											>
												<Link href="/reset">Forgot password?</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit" className="w-full">
						{showTwoFactor ? "Confirm" : "Login"}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
