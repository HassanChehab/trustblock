"use-client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ConditionalRendering from "@/components/shared/conditional-rendering";

export default function Footer() {
	const { status } = useSession();
	const isAuthenticated = status === "authenticated";

	return (
		<div className="w-full fixed bottom-0 h-[6em] bg-myLightGrey flex justify-between">
			<div className="w-[180px] h-[50px] mt-auto mb-auto ml-3 relative">
				<Image
					layout="fill"
					src="/footer-logo.png"
					alt="Footer log"
					objectFit="cover"
				/>
			</div>
			<div className="flex gap-16 xs:mr-16 mt-auto mb-auto lg:mr-32 text-bold">
				<Link href="/home">Home</Link>
				<Link href="/event/create">Create Event</Link>
				<ConditionalRendering shouldDisplay={!isAuthenticated}>
					<Link href="/api/auth/signin">Sign Up</Link>
				</ConditionalRendering>
				<Link href="/home">Explore Event</Link>
			</div>
		</div>
	);
}
