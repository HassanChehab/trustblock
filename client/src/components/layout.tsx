import "../styles/global.css";
import Navbar from "./shared/navbar";
import Footer from "./shared/footer";

export default function Layout({
	children,
	search,
	setSearch,
}: {
	children: any;
	search: string;
	setSearch: Function;
}) {
	return (
		<div className="relative h-[100vh]">
			<Navbar search={search} setSearch={setSearch} />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
