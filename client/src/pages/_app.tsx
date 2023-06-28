import { useState } from "react";
import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: {
	Component: any;
	pageProps: any;
}) {
	const [search, setSearch] = useState(null);

	return (
		<SessionProvider session={session}>
			<Layout searchForm={search} setSearch={setSearch}>
				<Component
					{...pageProps}
					searchForm={search}
					setSearch={setSearch}
				/>
			</Layout>
		</SessionProvider>
	);
}
