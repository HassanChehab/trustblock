import "../styles/global.css";
import { useState } from "react";
import Navbar from "./shared/navbar";
import Footer from "./shared/footer";

export default function Layout({ children }: { children: any }) {
	const [search, setSearch] = useState(null);

	return (
		<div className="relative h-[100vh] overflow-hidden">
			<Navbar search={search} setSearch={setSearch} />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
