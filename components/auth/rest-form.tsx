"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { reset } from "@/actions/reset";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { type Reset, resetSchema } from "@/lib/types";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ResetForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<Reset>({
		resolver: zodResolver(resetSchema),
		defaultValues: {
			username: "",
		},
	});

	const onSubmit = async (values: Reset) => {
		setError("");
		setSuccess("");

		startTransition(() =>
			reset(values).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
			}),
		);
	};

	return (
		<CardWrapper
			headerLabel="Forget your password?"
			backButtonLabel="Back to Login"
			backButtonHref="/login"
		>
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
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
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit" className="w-full">
						Send reset email
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
