import * as fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export class UploadService {
	isFileValid(file: any) {
		console.log(file.mimetype);
		const allowedExtensions = ['image/png', 'image/jpeg', 'image/jpg'];

		return allowedExtensions.includes(file.mimetype);
	}

	generateFile(file: any) {
		const uuid = uuidv4();
		const path = join(__dirname, '..', 'public');

		fs.writeFileSync(`${path}/${uuid}.jpg`, file.buffer);

		const url = `${process.env.SERVER_URL}/${uuid}.jpg`;

		return url;
	}
}
