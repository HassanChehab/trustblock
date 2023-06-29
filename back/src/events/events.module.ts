import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsValidator } from './events.validator';
import { EventsController } from './events.controller';
import { PrismaService } from '../utils/prisma.service';
import { UploadService } from '../utils/upload.service';
import { DataFormatter } from '../utils/data-formatter';

@Module({
	controllers: [EventsController],
	providers: [
		EventsService,
		PrismaService,
		UploadService,
		DataFormatter,
		EventsValidator,
	],
})
export class EventsModule {}
