import Image from "next/image";
import { Event } from "@types";
import { useRouter } from "next/router";
import dateUtils from "@/services/date-utils";
import type { GetServerSideProps } from "next";
import { MdLocationPin } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa";
import Button from "@/components/shared/button";
import ConditionalRendering from "@/components/shared/conditional-rendering";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	// Todo: Api call to get element by id
	// Todo: remove once back is operational
	const mockedData = [
		{
			id: 1,
			title: "Very long title in here, needs to be longer",
			date: new Date(),
			category: "Art",
			location: "Paris",
			description:
				"\
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
					",
			image: "https://i.pinimg.com/originals/19/fc/a4/19fca473bd84d1a7ea39c76b07193352.jpg",
			author: {
				id: 5,
				name: "Hassan Chehab",
			},
		},
		{
			id: 2,
			title: "Gaming",
			date: new Date(),
			category: "Art",
			location: "Paris",
			description:
				"\
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
					",
			image: "https://larevuetech.fr/wp-content/uploads/2023/03/Meilleurs-ecrans-gaming-4k-2023-scaled.jpg",
			author: {
				id: 6,
				name: "Unkown",
			},
		},
		{
			id: 3,
			title: "Cooking",
			date: new Date(),
			category: "Art",
			location: "Paris",
			description:
				"\
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
						fdaklfjda fdafkdjfhdakfjakjf dkjfdhafkajfkjdahfdalkjf dajfaihfadkjfdaj fahfdkajf adfhdaflkjaf adfkjhadflkjad fadhfadklfjad fajfkafj \
					",
			image: "https://wallpapercave.com/wp/wp9319078.jpg",
			author: {
				id: 6,
				name: "Unkown",
			},
		},
	];

	const fetchedEvent = mockedData.find(
		(event) => event.id === Number(query.id)
	);

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
	const formattedDate = dateUtils.getEventPageTopBlockFormattedDate(
		fetchedEvent.date
	);
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
						layout="fill"
						src={fetchedEvent.image}
						alt="card image"
					/>
				</div>
				{/* title and author */}

				<div className="relative w-full lg:h-inherit xs:h-[30em]">
					{/* actions div if authenticated */}
					<div className="absolute top-[10%]  w-full pl-24">
						<ConditionalRendering shouldDisplay={isAuthenticated}>
							<div className="flex gap-4">
								<div className="w-[150px] mt-8">
									<Button
										label="update event"
										buttonStyle="outlined"
										action={() =>
											console.log(
												"no action for this button"
											)
										}
									/>
								</div>
								<div className="w-[100px] mt-8">
									<Button
										label="delete"
										buttonStyle="danger"
										action={() =>
											console.log(
												"no action for this button"
											)
										}
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
									{fetchedEvent.author.name}
								</span>
							</p>
						</div>
						<div className="w-[150px] mt-8">
							<Button
								label="register"
								buttonStyle="primary"
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
			lg:h-[35em] xs:h-fit-content lg:pl-24 xs:pl-16
		"
		>
			<div className="lg:mt-32 xs:mt-8 w-full">
				<p className="text-md prose">{fetchedEvent.description}</p>
			</div>
			<div className="w-full">
				<div className="flex gap-4 lg:mt-32 xs:mt-8">
					<FaCalendarWeek className="w-[30px] h-[30px] text-myPurple" />
					<div>
						<p>Date and time: </p>
						<p>{formattedDate}</p>
						{/* Hardcode because I don't have a datepicker yet */}
						<p>1:00 AM - 1:30 AM WIB</p>
					</div>
				</div>
				<div className="flex gap-4 lg:mt-16 xs: mt-8 xs:pb-8">
					<MdLocationPin className="w-[35px] h-[35px] text-myPurple" />
					<div>
						<p>Location: </p>
						<p>{fetchedEvent.location}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function EventPage({ fetchedEvent }: { fetchedEvent: Event }) {
	// Todo: replace that variable by the actual value from nextAuth
	const isAuthenticated = true;

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
