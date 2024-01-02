import { BiSolidError } from "react-icons/bi";

interface FormError {
	message?: string;
}

export const FormError = ({ message }: FormError) => {
	if (!message) return null;
	return (
		<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
			<BiSolidError className="h-5 w-5" /> <p>{message}</p>
		</div>
	);
};
