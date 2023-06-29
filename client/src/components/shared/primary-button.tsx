export default function PrimaryButton({
	label,
	action,
	disabled,
	buttonType,
}: {
	label: string;
	action: Function;
	disabled?: boolean;
	buttonType?: string;
}) {
	return (
		<button
			type={buttonType ? buttonType : ""}
			className="w-full h-[40px] rounded-full bg-myPurple text-white"
			onClick={() => action()}
		>
			{label}
		</button>
	);
}
