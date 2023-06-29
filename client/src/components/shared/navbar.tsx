import Image from "next/image";
import { useRouter } from "next/router";
import SearchInput from "./search-input";
import DangerButton from "./danger-button";
import PrimayButton from "./primary-button";
import { BiChevronDown } from "react-icons/bi";
import OutlinedButton from "./outlined-button";
import { useSession, signOut, signIn } from "next-auth/react";
import ConditionalRendering from "@/components/shared/conditional-rendering";

export default function Navbar({
	searchForm,
	setSearch,
}: {
	setSearch: Function;
	searchForm: string | null;
}) {
	const router = useRouter();
	const dataForInput = searchForm;
	const { data: session, status } = useSession();
	const isAuthenticated = status === "authenticated";

	const isEventForm =
		isAuthenticated &&
		(router.pathname === "/event/create" ||
			router.pathname.includes("/event/update"));

	// use session to get author credentials
	const goToFormPage = () => router.push("/event/create");

	const disconnect = () => {
		signOut();
	};

	const connect = () => {
		signIn();
	};

	const goToHome = () => {
		router.push("/home");
	};

	return (
		<div className="flex justify-between bg-white h-[8em]">
			{/* logo */}
			<div
				className="w-[180px] h-[50px] relative mt-auto mb-auto pl-8"
				onClick={goToHome}
			>
				<Image
					layout="fill"
					src="/header-logo.png"
					alt="Header logo"
					objectFit="cover"
				/>
			</div>

			{/* Search bar */}
			<div className="m-auto xl:w-[40em] xs:w-[20em]">
				{/* Update or create event page */}
				<ConditionalRendering shouldDisplay={isEventForm}>
					<div className="flex lg:gap-16 xs:gap-4  mt-auto mb-auto w-full justify-center">
						<p className="font-extrabold">Event</p>
						<p>Order</p>
						<p>Withdraw</p>
						<p>Bank</p>
					</div>
				</ConditionalRendering>

				{/* Other pages regardless of authentication */}
				<ConditionalRendering shouldDisplay={!isEventForm}>
					<SearchInput
						storedData={dataForInput}
						targetField="search"
						iconType="search"
						userInput={searchForm?.search}
						dataModifier={setSearch}
						placeholder=""
					/>
				</ConditionalRendering>
			</div>

			{/* Profile Picture */}
			<ConditionalRendering shouldDisplay={isEventForm}>
				<div className="flex gap-4 pr-8 mt-auto mb-auto">
					<div className="rounded-full h-[70px] w-[70px] relative overflow-hidden">
						<Image
							fill
							src={`${process.env.SERVER_URL}/profile-picture.png`}
							alt="Profile image"
							objectFit="cover"
						/>
					</div>
					<p className="mt-auto mb-auto text-xl">John Doe</p>
					<BiChevronDown className="mt-auto mb-auto w-[30px] h-[30px] text-myDarkGrey font-bold" />
				</div>
			</ConditionalRendering>

			{/* Buttons */}
			<ConditionalRendering shouldDisplay={!isEventForm}>
				<ConditionalRendering shouldDisplay={isAuthenticated}>
					<div className="flex gap-4 pr-8 mt-auto mb-auto">
						<div className="w-[150px]">
							<OutlinedButton
								label="Create Event"
								action={goToFormPage}
							/>
						</div>
						<div className="w-[150px]">
							<DangerButton
								label="Disconnect"
								action={disconnect}
							/>
						</div>
					</div>
				</ConditionalRendering>
				<ConditionalRendering shouldDisplay={!isAuthenticated}>
					<div className="pr-8 mt-auto mb-auto">
						<div className="w-[100px]">
							<PrimayButton label="Connect" action={connect} />
						</div>
					</div>
				</ConditionalRendering>
			</ConditionalRendering>
		</div>
	);
}
