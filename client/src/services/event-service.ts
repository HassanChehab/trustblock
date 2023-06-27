import dayjs from "dayjs";

// Singeltion class that will handle all date formats across the app
class EventApiService {
	async createEvent(data: any) {
		await fetch(`${process.env.SERVER_URL}/events`, {
			method: "POST",
			body: data,
		});
	}

	fetchEvents(skip: number, take: number) {
		return fetch(`${process.env.SERVER_URL}/events/${skip}/${take}`, {
			method: "GET",
		});
	}

	fetchSearchedEvents(search: string) {
		return fetch(`${process.env.SERVER_URL}/events/search/${search}`, {
			method: "GET",
		});
	}

	deleteEvent(id: string) {
		return fetch(`${process.env.SERVER_URL}/events/${id}`, {
			method: "DELETE",
		});
	}
}

export default new EventApiService();
