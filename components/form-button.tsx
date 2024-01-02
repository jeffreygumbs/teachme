"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function FormButton() {
	const { pending } = useFormStatus();
	return (
		<Button type="submit">
			{pending ? "Saving changes..." : "Save changes"}
		</Button>
	);
}

export default FormButton;
