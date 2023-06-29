import {
	Controller,
	Put,
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
import { EventsValidator } from './events.validator';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UploadService } from '../utils/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventsController {
	constructor(
		private readonly eventsService: EventsService,
		private readonly uploadService: UploadService,
		private readonly eventsValidator: EventsValidator,
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
		// Form validators
		this.eventsValidator.isImageReceived(file);
		this.eventsValidator.isValidDate(data.date);
		this.eventsValidator.isFileValid(file, 'creation');
		this.eventsValidator.isValidLocation(data.location);

		try {
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

	@Get('/search/:input')
	findBySearch(@Param('input') search: string) {
		return this.eventsService.findBySearch(search);
	}

	@Get('/:skip/:take')
	findAll(@Param('skip') skip: string, @Param('take') take: string) {
		// handle offset and pagination
		return this.eventsService.findAll(Number(skip), Number(take));
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.eventsService.findOne(Number(id));
	}

	@Put('/:id')
	@UseInterceptors(FileInterceptor('image'))
	update(
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File,
		@Body() data: any,
	) {
		// Form Validators
		this.eventsValidator.isValidDate(data.date);
		this.eventsValidator.isFileValid(file, 'update');
		this.eventsValidator.isValidLocation(data.location);

		const { registeredImage, ...otherReceivedFields } = data;
		let eventData: CreateEventDto = {
			...otherReceivedFields,
			image: registeredImage,
		};

		try {
			// Check if image is valid
			if (file) {
				// Generate image store it in public folder and get Url
				const url: string = this.uploadService.generateFile(file);

				// Create Object prior to event Update
				eventData.image = url;
			}

			this.eventsService.update(Number(id), eventData);

			return { status: HttpStatus.OK };
		} catch (error) {
			console.log('', error);
			throw new HttpException(
				'Internal Server Error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		// delete image
		return this.eventsService.remove(Number(id));
	}
}
