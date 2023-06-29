import * as dayjs from 'dayjs';
import { HttpStatus, HttpException } from '@nestjs/common';

export class EventsValidator {
	// check if it is a valid location and throw an error if not
	isValidLocation(location: string) {
		// Not Ideal but will do
		const validLocations = [
			'paris',
			'tokyo',
			'dubai',
			'blida',
			'madrid',
			'gotham',
			'london',
			'wakanda',
			'new york',
			'istanbul',
		];

		// Check if location is valid
		if (!validLocations.includes(location.toLowerCase()))
			throw new HttpException(
				'You did not provide a valid location',
				HttpStatus.BAD_REQUEST,
			);
	}

	isAlphanumeric(string: string) {
		return /^\d+$/.test(string.split('/').join(''));
	}

	isValidDate(date: string) {
		if (!dayjs(date, 'DD/MM/YYYY').isValid() || !this.isAlphanumeric(date))
			throw new HttpException(
				'You did not provide a valid date',
				HttpStatus.BAD_REQUEST,
			);
	}

	// Check if image is received, only on creation
	isImageReceived(file: any) {
		if (!file)
			throw new HttpException(
				'You did not provide a valid image',
				HttpStatus.BAD_REQUEST,
			);
	}

	// On Update file is not mandatory
	// Only images are allowed for upload
	isFileValid(file: any, operation: string) {
		const allowedExtensions = ['image/png', 'image/jpeg', 'image/jpg'];

		if (operation === 'creation' && !file)
			throw new HttpException('Invalid File', HttpStatus.FORBIDDEN);

		if (file)
			if (!allowedExtensions.includes(file.mimetype))
				throw new HttpException('Invalid File', HttpStatus.FORBIDDEN);
	}
}
