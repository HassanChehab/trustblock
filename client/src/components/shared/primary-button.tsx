export default function PrimaryButton({
	label,
	action,
	disabled,
	buttonType,
}: {
	label: string;
	action: Function;
	disabled?: boolean;
	buttonType?: "button" | "reset" | "submit" | undefined;
}) {
	const activeStyle = "w-full h-[40px] rounded-full bg-myPurple text-white";
	const disabledStyle =
		"w-full h-[40px] rounded-full bg-myLightGrey text-myDarkGrey cursor-not-allowed";

	return (
		<button
			disabled={disabled}
			// @ts-ignore
			type={buttonType ? buttonType : ""}
			className={disabled ? disabledStyle : activeStyle}
			onClick={() => action()}
		>
			{label}
		</button>
	);
}
