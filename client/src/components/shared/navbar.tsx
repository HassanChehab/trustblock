import Image from "next/image";
import IconInput from "./icon-input";
import { useRouter } from "next/router";
import DangerButton from "./danger-button";
import PrimayButton from "./primary-button";
import OutlinedButton from "./outlined-button";
import { useSession, signOut, signIn } from "next-auth/react";
import ConditionalRendering from "@/components/shared/conditional-rendering";

export default function Navbar({
	search,
	setSearch,
}: {
	search: string | null;
	setSearch: Function;
}) {
	const router = useRouter();
	const dataForInput = { search };
	const { data: session, status } = useSession();
	const isAuthenticated = status === "authenticated";

	// use session to get author credentials
	const goToFormPage = () => router.push("/event/create");

	const disconnect = () => {
		signOut();
	};

	const connect = () => {
		signIn();
	};

	return (
		<div className="flex justify-between bg-white h-[8em]">
			{/* logo */}
			<div className="w-[200px] h-[80px] relative mt-auto mb-auto pl-8">
				<Image layout="fill" src="/header-logo.png" alt="Header logo" />
			</div>

			{/* Search bar */}
			<div className="m-auto xl:w-[40em] xs:w-[20em]">
				<IconInput
					storedData={dataForInput}
					targetField="search"
					iconType="search"
					userInput={search}
					dataModifier={setSearch}
					placeholder=""
				/>
			</div>

			{/* Buttons */}
			<ConditionalRendering shouldDisplay={isAuthenticated}>
				<div className="flex gap-4 pr-8 mt-auto mb-auto">
					<div className="w-[150px]">
						<OutlinedButton
							label="Create Event"
							action={goToFormPage}
						/>
					</div>
					<div className="w-[100px]">
						<DangerButton
							label="Disconnect"
							buttonStyle="danger"
							action={disconnect}
						/>
					</div>
				</div>
			</ConditionalRendering>
			<ConditionalRendering shouldDisplay={!isAuthenticated}>
				<div className="pr-8 mt-auto mb-auto">
					<div className="w-[100px]">
						<PrimayButton
							label="Connect"
							buttonStyle="primary"
							action={connect}
						/>
					</div>
				</div>
			</ConditionalRendering>
		</div>
	);
}
