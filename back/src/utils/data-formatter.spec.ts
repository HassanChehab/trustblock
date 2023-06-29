import { DataFormatter } from './data-formatter';

const dataFormatter = new DataFormatter();

describe('Data Formatter', () => {
	describe('Capitalize method tests', () => {
		it('It should return null', () => {
			expect(dataFormatter.capitalize('')).toBeFalsy();
		});

		it('It should capitalize the first character', () => {
			expect(dataFormatter.capitalize('aBCD ddfAADDFdv')).toEqual(
				'Abcd ddfaaddfdv',
			);
			expect(dataFormatter.capitalize('aBCD ddfAADDFdv!!2345')).toEqual(
				'Abcd ddfaaddfdv!!2345',
			);
		});
	});

	describe('Client format', () => {
		const dbData = [
			{
				id: 41,
				date: '11/12/1235',
				image: 'http://localhost:4000/020cdf05-f8a0-47ae-a22c-c8b605590d4c.jpg',
				title: 'Exploration Game',
				category: 'gaming',
				location: 'gotham',
				description:
					'one morning, when gregor samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. he lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. the bedding was hardly able to cover it and seemed ready to slide off any moment. his many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "what\'s happened to me?" he thought. it wasn\'t a dream. his room, a proper human room although a little too small, lay peacefully between its four familiar walls. a collection of textile samples lay spread out on the table ',
				authorId: 'mypersonnaldev@gmail.com',
			},
		];

		it('It should return an empty array', () => {
			expect(dataFormatter.formatForClient([])).toEqual([]);
			expect(dataFormatter.formatForClient({})).toEqual([]);
			expect(dataFormatter.formatForClient(null)).toEqual([]);
		});

		it('Should format data for client', () => {
			expect(dataFormatter.formatForClient(dbData)).toEqual([
				{
					id: 41,
					image:
						'http://localhost:4000/020cdf05-f8a0-47ae-a22c-c8b605590d4c.jpg',
					title: 'Exploration Game',
					category: 'Gaming',
					location: 'Gotham',
					description:
						'One morning, when gregor samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. he lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. the bedding was hardly able to cover it and seemed ready to slide off any moment. his many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "what\'s happened to me?" he thought. it wasn\'t a dream. his room, a proper human room although a little too small, lay peacefully between its four familiar walls. a collection of textile samples lay spread out on the table ',
					date: '11/12/1235',
					author: {
						name: 'John Doe',
						email: 'mypersonnaldev@gmail.com',
					},
				},
			]);
		});
	});
});
