import "@/styles/animations.css";
import { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import eventService from "@/services/event-service";
import HomeCard from "@/components/home/home-card";
import PrimaryButton from "@/components/shared/primary-button";
import ConditionalRendering from "@/components/shared/conditional-rendering";

export default function HomePage({ searchForm }: { searchForm: any }) {
	const takeNumber = 10;
	const [pageNumber, setPageNumber] = useState(0);
	const [savedEvents, setSavedEvents] = useState([]);
	const [fetchedEvents, setFetchedEvents] = useState([]);
	const [endOfContent, setEndOfContent] = useState(false);
	const offset = takeNumber * pageNumber;

	const getPaginatedEvents = async () => {
		const response = await eventService.fetchEvents(offset, takeNumber);
		const data = await response.json();

		if (!data.length || data.length < takeNumber) setEndOfContent(true);

		await setFetchedEvents([]);
		await setSavedEvents([...fetchedEvents, ...data]);
		await setFetchedEvents([...fetchedEvents, ...data]);
	};

	const getPaginatedEventsAfterSearch = async () => {
		setFetchedEvents(savedEvents);
	};

	const getSearchedEvents = async () => {
		const response = await eventService.fetchSearchedEvents(
			searchForm?.search
		);
		const data = await response.json();

		setFetchedEvents([...data]);
	};

	const addPage = () => {
		setPageNumber(pageNumber + 1);
	};

	// Get Events list with limit and offset
	useEffect(() => {
		getPaginatedEvents();
	}, []);

	// fire if search is being modified
	useEffect(() => {
		if (searchForm?.search) getSearchedEvents();
		else {
			getPaginatedEventsAfterSearch();
		}
	}, [searchForm?.search]);

	// fire when page number is modified
	useEffect(() => {
		getPaginatedEvents();
	}, [pageNumber]);

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
				<ConditionalRendering
					shouldDisplay={!searchForm?.search && !endOfContent}
				>
					<PrimaryButton label="See More" action={addPage} />
				</ConditionalRendering>
			</div>
		</div>
	);
}
