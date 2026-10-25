"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { newPassword } from "@/actions/new-password";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { type NewPassword, newPasswordSchema } from "@/lib/types";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<NewPassword>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: "",
		},
	});

	const onSubmit = async (values: NewPassword) => {
		setError("");
		setSuccess("");

		startTransition(() =>
			newPassword(values, token).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
			}),
		);
	};

	return (
		<CardWrapper
			headerLabel="Enter a new password"
			backButtonLabel="Back to Login"
			backButtonHref="/login"
		>
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
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
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit" className="w-full">
						Reset password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
