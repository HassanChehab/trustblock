import dayjs from "dayjs";

// Singeltion class that will handle all date formats across the app
class EventApiService {
	async createEvent(data: any) {
		await fetch(`${process.env.SERVER_URL}/events`, {
			method: "POST",
			body: data,
		});
	}

	fetchEvents() {
		return fetch(`${process.env.SERVER_URL}/events`, {
			method: "GET",
		});
	}

	deleteEvent(id) {
		return fetch(`${process.env.SERVER_URL}/events/${id}`, {
			method: "DELETE",
		});
	}
}

export default new EventApiService();
