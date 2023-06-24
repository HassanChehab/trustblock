// This component is used to mimic conditional rendering of vue.js
// It make it more readable compared to the regular ways of doint that in react.
export default function ConditionalRendering({
	shouldDisplay,
	children,
}: {
	shouldDisplay: boolean;
	children: any;
}) {
	if (shouldDisplay) return <>{children}</>;
	return <></>;
}
