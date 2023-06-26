import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';

import { UploadService } from '../upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
	constructor(
		private readonly eventsService: EventsService,
		private readonly uploadService: UploadService,
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
		const url = this.uploadService.generateFile(file);
		// Create actual event

		return { statusCode: 201 };
	}

	@Get()
	findAll() {
		return this.eventsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.eventsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
		return this.eventsService.update(+id, updateEventDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.eventsService.remove(+id);
	}
}
