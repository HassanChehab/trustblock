import * as fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export class UploadService {
	isFileValid(file: any) {
		const allowedExtensions = ['image/png', 'image/jpeg', 'image/jpg'];

		return allowedExtensions.includes(file.mimetype);
	}

	generateFile(file: any) {
		const uuid = uuidv4();

		// for some reason path includes /dist sometimes
		const path = join(__dirname, '..', 'public');

		const formattedPath = !path.includes('/dist')
			? path
			: path.split('/dist').join('');

		fs.writeFileSync(`${formattedPath}/${uuid}.jpg`, file.buffer);

		const url = `${process.env.SERVER_URL}/${uuid}.jpg`;

		return url;
	}
}
