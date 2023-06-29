export default function OutlinedButton({
	label,
	action,
	disabled,
}: {
	label: string;
	action: Function;
	disabled?: boolean;
}) {
	return (
		<button
			className="w-full h-[40px] rounded-full bg-inherit text-myPurple border-2 border-myPurple"
			onClick={() => action()}
		>
			{label}
		</button>
	);
}
