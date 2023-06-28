"use-client";

import Image from "next/image";
import Router from "next/router";
import { Author, Event } from "../../types";
import { useSession } from "next-auth/react";
import dateUtils from "@/services/date-utils";
import stringUtils from "@/services/string-utils";

import "@/styles/animations.css";

interface Card extends Event {
	setSearch: Function;
}

export default function HomeCard({
	id,
	date,
	title,
	image,
	author,
	category,
	location,
	setSearch,
	description,
}: Card) {
	const formattedTitle = stringUtils.stringSizeCheck(title);
	const formattedDate = dateUtils.getHomeCardFormattedDate(date);

	const cardClicked = () => {
		Router.push({
			pathname: `/event/${id}`,
		});
		setSearch("");
	};

	const { data } = useSession();
	const isAuthor = author.email === data?.user.email;

	return (
		<div
			onClick={cardClicked}
			className="w-[20em] h-[25em] rounded-3xl overflow-hidden drop-shadow-xl bg-white relative cursor-pointer"
		>
			<div className="h-[60%] relative">
				<Image fill src={image} alt="Card image" objectFit="cover" />
			</div>
			<div className="pl-4 pr-4 pt-4">
				<p className="font-bold text-myDarkGrey">{formattedDate}</p>
				<h3 className="font-bold text-lg mt-4 mb-3">
					{formattedTitle}
				</h3>
				<p className="font-bold text-myDarkGrey absolute bottom-4 left-4">
					{isAuthor ? "Me" : author.name}
				</p>
			</div>
		</div>
	);
}
