import { BiSolidError } from "react-icons/bi";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel="Oops! Something went wrong"
			backButtonHref="/login"
			backButtonLabel="Back to login"
		>
			<div className="w-full flex justify-center">
				<BiSolidError className="text-4xl text-destructive" />
			</div>
		</CardWrapper>
	);
};
