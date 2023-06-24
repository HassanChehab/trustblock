import "../styles/global.css";

export default function Layout({ children }) {
	return (
		<>
			{/* header */}
			<main>{children}</main>
			{/* footer */}
		</>
	);
}
