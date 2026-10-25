"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { register } from "@/actions/register";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { type Register, registerSchema } from "@/lib/types";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<Register>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: Register) => {
		setError("");
		setSuccess("");

		startTransition(() =>
			register(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			}),
		);
	};

	return (
		<CardWrapper
			headerLabel="Welcome to the Register Page"
			backButtonLabel="Already have an account?"
			backButtonHref="/login"
			showSocial
		>
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl {...field}>
										<Input
											{...field}
											type="text"
											placeholder="John Doe"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl {...field}>
										<Input
											{...field}
											type="password"
											placeholder="********"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit" className="w-full">
						Create an account
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
