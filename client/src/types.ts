export interface Author {
	id: number;
	name: string;
}

export interface Event {
	id: number;
	date: Date;
	title: string;
	image: string;
	author: Author;
	category: string;
	location: string;
	description: string;
}
