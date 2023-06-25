import "../styles/global.css";
import Footer from "./shared/footer";

export default function Layout({ children }: { children: any }) {
	return (
		<div className="relative h-[100vh]">
			{/* header */}
			<main>{children}</main>
			<Footer />
		</div>
	);
}
