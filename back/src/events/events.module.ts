import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma.service';
import { EventsController } from './events.controller';
import { UploadService } from '../upload.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService, UploadService],
})
export class EventsModule {}
