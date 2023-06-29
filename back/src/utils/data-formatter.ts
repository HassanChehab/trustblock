import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export class DataFormatter {
	capitalize(elem: string) {
		if (elem.length) {
			return elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase();
		}
	}

	formatBeforeCreationOrUpdate(event) {
		event.category.toLowerCase();
		event.location.toLowerCase();
		event.description.toLowerCase();
	}

	formatForClient(events: any) {
		return events.map((event) => ({
			id: event.id,
			image: event.image,
			title: event.title,
			category: this.capitalize(event.category),
			location: this.capitalize(event.location),
			description: this.capitalize(event.description),
			date: event.date,
			author: {
				name: 'John Doe',
				email: event.authorId,
			},
		}));
	}
}
