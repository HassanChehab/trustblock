import { HttpStatus } from '@nestjs/common';
import { EventsValidator } from './events.validator';

const eventValidator = new EventsValidator();

describe('EventsValidator tests', () => {
	describe('Location validator test', () => {
		it('Shoud return BAD REQUEST', () => {
			try {
				eventValidator.isValidLocation('');
				eventValidator.isValidLocation('Parisdkjdkdj');
			} catch (err) {
				expect(err.status).toEqual(HttpStatus.BAD_REQUEST);
				expect(err.message).toBe('You did not provide a valid location');
			}
		});

		it('It should keep running', () => {
			// Either there a throwd error or execution continues
			expect(eventValidator.isValidLocation('PaRiS')).toBeUndefined();
			expect(eventValidator.isValidLocation('tokyo')).toBeUndefined();
			expect(eventValidator.isValidLocation('DuBai')).toBeUndefined();
			expect(eventValidator.isValidLocation('Istanbul')).toBeUndefined();
			expect(eventValidator.isValidLocation('lOnDOn')).toBeUndefined();
			expect(eventValidator.isValidLocation('wakanda')).toBeUndefined();
			expect(eventValidator.isValidLocation('new YORK')).toBeUndefined();
			expect(eventValidator.isValidLocation('blidA')).toBeUndefined();
			expect(eventValidator.isValidLocation('madrid')).toBeUndefined();
			expect(eventValidator.isValidLocation('GOTHAM')).toBeUndefined();
		});
	});

	describe('Is Alphanumeric', () => {
		expect(eventValidator.isAlphanumeric('1234567')).toEqual(true);
		expect(eventValidator.isAlphanumeric('!234567')).toEqual(false);
		expect(eventValidator.isAlphanumeric('123 4567')).toEqual(false);
		expect(eventValidator.isAlphanumeric('1234567aldakf')).toEqual(false);
		expect(eventValidator.isAlphanumeric('1234fdkj fdakj (567')).toEqual(false);
	});

	describe('Is valid date', () => {
		it('Should return BAD_REQUEST', () => {
			try {
				eventValidator.isValidDate('1/1/1235');
				eventValidator.isValidDate('23/1/1234');
				eventValidator.isValidDate('1234/12/12');
				eventValidator.isValidDate('1234-12-12');
				eventValidator.isValidDate('1234 12 12');
				eventValidator.isValidDate('11/11/12351234');
			} catch (err) {
				expect(err.status).toEqual(HttpStatus.BAD_REQUEST);
				expect(err.message).toBe('You did not provide a valid date');
			}
		});

		it('Should keep running', () => {
			eventValidator.isValidDate('12/12/5555');
		});
	});
});
