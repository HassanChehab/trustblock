import dayjs from "dayjs";

// Singeltion class that will handle all date formats across the app
class EventApiService {
	createEvent(data: any) {
		for (var key of data.entries()) {
			console.log(key[0] + ", " + key[1]);
		}

		return fetch("http://localhost:4000/events", {
			method: "POST",
			body: data,
			// headers: {
			// 	"Content-Type": "multipart/form-data",
			// },
		});
	}
}

export default new EventApiService();
