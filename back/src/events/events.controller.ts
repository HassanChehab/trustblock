import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpStatus,
	UploadedFile,
	HttpException,
	UseInterceptors,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UploadService } from '../utils/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventsController {
	constructor(
		private readonly eventsService: EventsService,
		private readonly uploadService: UploadService,
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
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
		if (!validLocations.includes(data?.location.toLowerCase()))
			throw new HttpException(
				'You did not provide a valid location',
				HttpStatus.BAD_REQUEST,
			);

		try {
			// Check if image is valid
			const isValid = this.uploadService.isFileValid(file);

			if (!isValid)
				throw new HttpException('Invalid File', HttpStatus.FORBIDDEN);

			// Generate image store it in public folder and get Url
			const url: string = this.uploadService.generateFile(file);

			// Create Object prior to event Creation
			const eventData: CreateEventDto = { image: url, ...data };

			// Create Event
			this.eventsService.create(eventData);

			return { status: HttpStatus.CREATED };
		} catch (error) {
			console.log('', error);
			throw new HttpException(
				'Internal Server Error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Get()
	findAll() {
		// handle offset and pagination
		return this.eventsService.findAll();
	}

	@Get('/search/:input')
	findBySearch(@Param('input') search: string) {
		return this.eventsService.findBySearch(search);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.eventsService.findOne(Number(id));
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
		return this.eventsService.update(Number(id), updateEventDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		// delete image
		return this.eventsService.remove(Number(id));
	}
}
