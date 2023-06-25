import dayjs from "dayjs";

// Singeltion class that will handle all date formats across the app
class EventApiService {
	async createEvent(data: any) {
		const response = await fetch(`${process.env.SERVER_URL}/events`, {
			method: "POST",
			body: data,
		});
	}
}

export default new EventApiService();
