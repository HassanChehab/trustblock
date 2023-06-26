import { join } from 'path';
import * as fs from 'fs';

export class UploadService {
	generateFile(file) {
		const path = join(__dirname, '..', 'public');
		const folderContent = fs.readdirSync(path);

		fs.writeFileSync(`${path}/image-${folderContent.length}.jpg`, file.buffer);

		return `${process.env.SERVER_URL}/image-${folderContent.length}.jpg`;
	}
}