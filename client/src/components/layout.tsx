import "../styles/global.css";
import Navbar from "./shared/navbar";
import Footer from "./shared/footer";

export default function Layout({
	children,
	setSearch,
	searchForm,
}: {
	children: any;
	searchForm: string;
	setSearch: Function;
}) {
	return (
		<div className="relative h-[100vh]">
			<Navbar searchForm={searchForm} setSearch={setSearch} />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
