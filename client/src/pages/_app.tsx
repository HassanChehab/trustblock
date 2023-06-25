import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: {
	Component: any;
	pageProps: any;
}) {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}
