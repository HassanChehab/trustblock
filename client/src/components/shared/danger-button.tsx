export default function DangerButton({
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
			className="w-full h-[40px] rounded-full bg-myRed text-white"
			onClick={() => action()}
		>
			{label}
		</button>
	);
}
