export default function Button({
	label,
	action,
	disabled,
}: {
	label: string;
	action: Function;
	disabled?: boolean;
}) {
	return (
		<button className="w-full h-[40px] rounded-full bg-myPurple text-white">
			{label}
		</button>
	);
}
