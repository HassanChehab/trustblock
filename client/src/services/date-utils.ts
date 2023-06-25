import dayjs from "dayjs";

// Singeltion class that will handle all date formats across the app
// Hours are hardcoded because I do not have a real datepicker for now
class DateUtils {
	getHomeCardFormattedDate(date: Date) {
		return `${dayjs(date).format("ddd, MMM DD")}, 8 : 30 AM`;
	}

	getEventPageTopBlockFormattedDate(date: Date) {
		return dayjs(date).format("MMM DD").toUpperCase();
	}

	getEventPageLowerBlockFormattedDate(date: Date) {
		return dayjs(date).format("ddd, MMMM D, YYYY");
	}
}

export default new DateUtils();
