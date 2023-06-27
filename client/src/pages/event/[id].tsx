import Image from "next/image";
import { Event } from "@types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dateUtils from "@/services/date-utils";
import type { GetServerSideProps } from "next";
import { MdLocationPin } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import eventService from "@/services/event-service";
import DangerButton from "@/components/shared/danger-button";
import PrimaryButton from "@/components/shared/primary-button";
import OutlinedButton from "@/components/shared/outlined-button";
import ConditionalRendering from "@/components/shared/conditional-rendering";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const response = await eventService.fetchEvents();
	const data = await response.json();

	const fetchedEvent = data.find((event) => event.id === Number(query.id));

	return {
		props: { fetchedEvent: JSON.parse(JSON.stringify(fetchedEvent)) },
	};
};

function TopRow({
	fetchedEvent,
	isAuthenticated,
}: {
	fetchedEvent: Event;
	isAuthenticated: boolean;
}) {
	const router = useRouter();
	const { data } = useSession();
	const isAuthor = fetchedEvent.author.email === data?.user.email;
	const formattedDate = dateUtils.getEventPageTopBlockFormattedDate(
		fetchedEvent.date
	);

	const deleteEvent = async () => {
		try {
			await eventService.deleteEvent(router.query.id);
			router.push("/home");
		} catch (err) {
			// Maybe add notification
			console.log(err);
		}
	};

	return (
		<>
			<div className="w-full lg:flex">
				{/* image */}
				<div
					className="
					w-full
					lg:h-[40em] xs:h-[30em] bg-myred relative
				"
				>
					<Image
						fill
						objectFit="cover"
						src={fetchedEvent.image}
						alt="card image"
					/>
				</div>
				{/* title and author */}

				<div className="relative w-full lg:h-inherit xs:h-[30em]">
					{/* actions div if authenticated */}
					<div className="absolute top-[10%]  w-full pl-24">
						<ConditionalRendering
							shouldDisplay={isAuthenticated && isAuthor}
						>
							<div className="flex gap-4">
								<div className="w-[150px] mt-8">
									<OutlinedButton
										label="update event"
										action={() =>
											console.log(
												"no action for this button"
											)
										}
									/>
								</div>
								<div className="w-[100px] mt-8">
									<DangerButton
										label="delete"
										action={deleteEvent}
									/>
								</div>
							</div>
						</ConditionalRendering>
					</div>

					<div className="prose absolute top-1/3  w-full pl-24">
						<p className="font-bold text-sm">{formattedDate}</p>
						<h1>{fetchedEvent.title}</h1>
						<div
							className="
							flex 
							md:space-x-64 xs:space-x-8
						"
						>
							<p className="font-bold text-sm">$732.58</p>
							<p className="font-bold text-sm">
								by&nbsp;
								<span className="text-myPurple">
									{isAuthor ? "Me" : fetchedEvent.author.name}
								</span>
							</p>
						</div>
						<div className="w-[150px] mt-8">
							<PrimaryButton
								label="register"
								action={() =>
									console.log("no action for this button")
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function BottomDiv({ fetchedEvent }) {
	const formattedDate = dateUtils.getEventPageLowerBlockFormattedDate(
		fetchedEvent.date
	);
	return (
		<div
			className="
			bg-myLightBlue lg:flex w-fill
			lg:h-[35em] xs:h-fit-content lg:pl-24 xs:pl-16 xs:pb-[10em]
		"
		>
			<div className="lg:mt-16 xs:mt-8 w-full">
				<p className="text-md prose">{fetchedEvent.description}</p>
			</div>
			<div className="w-full">
				<div className="flex gap-4 lg:mt-16 xs:mt-8">
					<FaCalendarWeek className="w-[30px] h-[30px] text-myPurple" />
					<div>
						<p>Date and time: </p>
						<p className="font-extrabold">{formattedDate}</p>
						{/* Hardcode because I don't have a datepicker yet */}
						<p className="font-extrabold">1:00 AM - 1:30 AM WIB</p>
					</div>
				</div>
				<div className="flex gap-4 lg:mt-16 xs: mt-8 xs:pb-8">
					<MdLocationPin className="w-[35px] h-[35px] text-myPurple" />
					<div>
						<p>Location: </p>
						<p className="font-extrabold">
							{fetchedEvent.location}
						</p>
					</div>
				</div>

				<div className="flex gap-4 lg:mt-16 xs: mt-8 xs:pb-8">
					<BiSolidCategory className="w-[35px] h-[35px] text-myPurple" />
					<div>
						<p>Category: </p>
						<p className="font-extrabold">
							{fetchedEvent.category}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function EventPage({ fetchedEvent }: { fetchedEvent: Event }) {
	const { status } = useSession();
	const isAuthenticated = status === "authenticated";

	return (
		<div className="w-full h-fit-content bg-myLightBlue">
			{/* Image and title div */}
			<TopRow
				fetchedEvent={fetchedEvent}
				isAuthenticated={isAuthenticated}
			/>

			{/* Descriptions and date */}
			<BottomDiv fetchedEvent={fetchedEvent} />
		</div>
	);
}
