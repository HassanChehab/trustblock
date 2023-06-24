import ConditionalRendering from "@/components/shared/conditional-rendering";

export default function Button({
	label,
	action,
	disabled,
	buttonStyle,
}: {
	label: string;
	action: Function;
	disabled?: boolean;
	buttonStyle: "outlined" | "primary" | "danger";
}) {
	return (
		<>
			{/* Primary button */}
			<ConditionalRendering shouldDisplay={buttonStyle === "primary"}>
				<button className="w-full h-[40px] rounded-full bg-myPurple text-white">
					{label}
				</button>
			</ConditionalRendering>

			{/* Oulined button */}
			<ConditionalRendering shouldDisplay={buttonStyle === "outlined"}>
				<button className="w-full h-[40px] rounded-full bg-inherit text-myPurple border-2 border-myPurple">
					{label}
				</button>
			</ConditionalRendering>

			{/* Danger button */}
			<ConditionalRendering shouldDisplay={buttonStyle === "danger"}>
				<button className="w-full h-[40px] rounded-full bg-myRed text-white">
					{label}
				</button>
			</ConditionalRendering>
		</>
	);
}
