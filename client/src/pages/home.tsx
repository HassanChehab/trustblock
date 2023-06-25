// Todo: remove once back is operational
const mockedData = [
	{
		id: 1,
		title: "Very long title in here, needs to be longer",
		date: new Date(),
		category: "Art",
		Location: "Paris",
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
		Location: "Paris",
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
		Location: "Paris",
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

import "@/styles/animations.css";
import Button from "@/components/shared/button";
import HomeCard from "@/components/home/home-card";

export default function HomePage() {
	// Todo: replace that variable by the actual value from nextAuth
	const isAuthenticated = false;

	return (
		<div className="w-full h-fit overflow-hidden">
			<h1
				className="
				2xl:ml-24 2xl:mr-24 2xl:mt-32  md:ml-8 md:mr-8 md:mt-32    xs:ml-4 xs:mr-4 xs:mt-4
				md:text-3xl   xs:text-2xl
			"
			>
				Our Events
			</h1>
			<div
				className="
				w-fit-content min-h-[500px] h-fit-content 
				flex flex-wrap gap-4 xs:justify-center md:justify-start
				2xl:ml-24 2xl:mr-24 2xl:mt-4  md:ml-8 md:mr-8 md:mt-4    xs:ml-4 xs:mr-4 xs:mt-4
			"
			>
				{mockedData.map((event, idx) => {
					return (
						<div
							key={event.id}
							className="home-card-slide-left"
							style={{ animationDelay: `${100 * idx}ms` }}
						>
							<HomeCard {...event} />
						</div>
					);
				})}
			</div>
			<div className="w-[150px] m-auto">
				<Button
					label="See More"
					buttonStyle="primary"
					action={() => console.log("no action for this button")}
				/>
			</div>
		</div>
	);
}
