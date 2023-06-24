"use-client";

import Image from "next/image";
import Router from "next/router";
import dateUtils from "@/services/date-utils";
import stringUtils from "@/services/string-utils";

import "@/styles/animations.css";

interface Author {
	id: number;
	name: string;
}

interface Event {
	id: numver;
	date: date;
	title: string;
	image: string;
	author: Author;
	category: string;
	location: string;
	description: string;
}

export default function HomeCard({
	id,
	date,
	title,
	image,
	author,
	category,
	location,
	description,
}: Event) {
	const formattedTitle = stringUtils.stringSizeCheck(title);
	const formattedDate = dateUtils.getHomeCardFormattedDate(date);

	const cardClicked = () => {
		Router.push({
			pathname: `/event/${id}`,
			state: {
				event: {
					id,
					date,
					title,
					image,
					author,
					category,
					description,
				},
			},
		});
	};

	return (
		<div
			onClick={cardClicked}
			className="w-[20em] h-[25em] rounded-3xl overflow-hidden drop-shadow-xl bg-white relative cursor-pointer home-card-move-up"
		>
			<div className="h-[60%] relative">
				<Image layout="fill" src={image} alt="Card image" />
			</div>
			<div className="pl-4 pr-4 pt-4">
				<p className="font-bold text-myDarkGrey">{formattedDate}</p>
				<h3 className="font-bold text-lg mt-4 mb-3">
					{formattedTitle}
				</h3>
				<p className="font-bold text-myDarkGrey absolute bottom-4 left-4">
					{author.name}
				</p>
			</div>
		</div>
	);
}
