"use-client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
	return (
		<div className="lg:absolute lg:bottom-0 w-full h-[8em] bg-myLightGrey flex justify-between">
			<div className="w-[200px] h-[80px] bg-red-200 mt-6 ml-3 relative">
				<Image layout="fill" src="/footer-logo.png" alt="Footer log" />
			</div>
			<div className="flex gap-16 xs:mr-16 mt-14 lg:mr-32 text-myDarkGrey text-bold">
				<Link href="/home">Home</Link>
				<Link href="/event/create">Create Event</Link>
				<Link href="/api/auth/signin">Sign Up</Link>
				<Link href="/home">Explore Event</Link>
			</div>
		</div>
	);
}
