import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
	date: string;
	image: string;
	title: string;
	authorId: string;
	category: string;
	location: string;
	description: string;
	registeredImage: string;
}
