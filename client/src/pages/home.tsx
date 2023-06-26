import "@/styles/animations.css";
import type { GetServerSideProps } from "next";
import eventService from "@/services/event-service";
import HomeCard from "@/components/home/home-card";
import PrimaryButton from "@/components/shared/primary-button";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const response = await eventService.fetchEvents();
	const data = await response.json();

	return {
		props: { fetchedEvents: JSON.parse(JSON.stringify(data)) },
	};
};

export default function HomePage({ fetchedEvents }: any[]) {
	// Todo: replace that variable by the actual value from nextAuth
	const isAuthenticated = false;

	return (
		<div className="w-full h-fit m-h-[100vh] overflow-hidden">
			<h1
				className="
				2xl:ml-24 2xl:mr-24 2xl:mt-16  md:ml-8 md:mr-8 md:mt-16    xs:ml-4 xs:mr-4 xs:mt-4
				md:text-3xl   xs:text-2xl
			"
			>
				Our Events
			</h1>
			<div
				className="
				overflow-auto
				w-fit-content min-h-[500px] h-fit-content 
				flex flex-wrap gap-4 xs:justify-center md:justify-start
				2xl:ml-24 2xl:mr-24 2xl:mt-4  md:ml-8 md:mr-8 md:mt-4    xs:ml-4 xs:mr-4 xs:mt-4
			"
			>
				{fetchedEvents.map((event, idx) => {
					return (
						<div
							key={event.id}
							className="home-card-slide-left pb-[5em]"
							style={{ animationDelay: `${100 * idx}ms` }}
						>
							<HomeCard {...event} />
						</div>
					);
				})}
			</div>
			<div className="w-[150px] m-auto xs:mb-[10em]">
				<PrimaryButton
					label="See More"
					action={() => console.log("no action for this button")}
				/>
			</div>
		</div>
	);
}
